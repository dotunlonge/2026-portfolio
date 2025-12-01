#include "server.h"
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <iostream>
#include <sstream>
#include <fstream>
#include <thread>
#include <vector>
#include <cstdlib>
#include <cstring>

SimpleHTTPServer::SimpleHTTPServer(int port) : port_(port), server_fd_(-1), running_(false) {}

SimpleHTTPServer::~SimpleHTTPServer() {
    stop();
}

void SimpleHTTPServer::addRoute(const std::string& path, std::function<std::string()> handler) {
    routes_[path] = handler;
}

void SimpleHTTPServer::addRouteWithParam(const std::string& path, std::function<std::string(const std::string&)> handler) {
    param_routes_[path] = handler;
}

std::string SimpleHTTPServer::parsePath(const std::string& request) {
    std::istringstream iss(request);
    std::string line;
    if (std::getline(iss, line)) {
        std::istringstream lineStream(line);
        std::string method, path, protocol;
        if (lineStream >> method >> path >> protocol) {
            return path;
        }
    }
    return "";
}


std::string SimpleHTTPServer::getAllowedOrigin() {
    const char* allowed_origin = std::getenv("ALLOWED_ORIGIN");
    if (allowed_origin && strlen(allowed_origin) > 0) {
        return std::string(allowed_origin);
    }
    // Default to allowing localhost for development
    return "http://localhost:3000";
}

std::string SimpleHTTPServer::createResponse(const std::string& body, const std::string& contentType, int statusCode) {
    std::ostringstream response;
    if (statusCode == 200) {
        response << "HTTP/1.1 200 OK\r\n";
    } else if (statusCode == 404) {
        response << "HTTP/1.1 404 Not Found\r\n";
    } else {
        response << "HTTP/1.1 500 Internal Server Error\r\n";
    }
    response << "Content-Type: " << contentType << "\r\n";
    
    // Use configurable CORS origin instead of wildcard
    std::string allowed_origin = getAllowedOrigin();
    response << "Access-Control-Allow-Origin: " << allowed_origin << "\r\n";
    response << "Access-Control-Allow-Methods: GET, POST, OPTIONS\r\n";
    response << "Access-Control-Allow-Headers: Content-Type\r\n";
    response << "Access-Control-Allow-Credentials: true\r\n";
    response << "Content-Length: " << body.length() << "\r\n";
    response << "\r\n";
    response << body;
    return response.str();
}

std::string SimpleHTTPServer::readFile(const std::string& path) {
    std::ifstream file(path);
    if (!file.is_open()) {
        return "";
    }
    std::ostringstream buffer;
    buffer << file.rdbuf();
    return buffer.str();
}

void SimpleHTTPServer::handleRequest(int client_fd) {
    char buffer[4096] = {0};
    ssize_t bytes_read = read(client_fd, buffer, 4095);
    
    if (bytes_read <= 0) {
        close(client_fd);
        return;
    }
    
    std::string request(buffer, bytes_read);
    std::string path = parsePath(request);
    
    // Handle OPTIONS for CORS
    if (request.find("OPTIONS") == 0) {
        std::string allowed_origin = getAllowedOrigin();
        std::string response = "HTTP/1.1 200 OK\r\n"
                              "Access-Control-Allow-Origin: " + allowed_origin + "\r\n"
                              "Access-Control-Allow-Methods: GET, POST, OPTIONS\r\n"
                              "Access-Control-Allow-Headers: Content-Type\r\n"
                              "Access-Control-Allow-Credentials: true\r\n"
                              "\r\n";
        send(client_fd, response.c_str(), response.length(), 0);
        close(client_fd);
        return;
    }
    
    std::string response_body;
    std::string content_type = "application/json";
    
    // Check exact routes first
    if (routes_.find(path) != routes_.end()) {
        response_body = routes_[path]();
    }
    // Check parameterized routes
    else if (path.find("/api/blog/") == 0) {
        std::string id = path.substr(10); // Remove "/api/blog/"
        if (param_routes_.find("/api/blog/:id") != param_routes_.end()) {
            response_body = param_routes_["/api/blog/:id"](id);
            if (response_body == "{}") {
                response_body = "{\"error\": \"Post not found\"}";
                std::string response = createResponse(response_body, content_type, 404);
                send(client_fd, response.c_str(), response.length(), 0);
                close(client_fd);
                return;
            }
        } else {
            response_body = "{\"error\": \"Not found\"}";
            std::string response = createResponse(response_body, content_type, 404);
            send(client_fd, response.c_str(), response.length(), 0);
            close(client_fd);
            return;
        }
    }
    else {
        response_body = "{\"error\": \"Not found\"}";
        std::string response = createResponse(response_body, content_type, 404);
        send(client_fd, response.c_str(), response.length(), 0);
        close(client_fd);
        return;
    }
    
    std::string response = createResponse(response_body, content_type);
    send(client_fd, response.c_str(), response.length(), 0);
    close(client_fd);
}

void SimpleHTTPServer::start() {
    server_fd_ = socket(AF_INET, SOCK_STREAM, 0);
    if (server_fd_ < 0) {
        std::cerr << "Error creating socket" << std::endl;
        return;
    }
    
    int opt = 1;
    setsockopt(server_fd_, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
    
    struct sockaddr_in address;
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(port_);
    
    if (bind(server_fd_, (struct sockaddr *)&address, sizeof(address)) < 0) {
        std::cerr << "Error binding socket" << std::endl;
        close(server_fd_);
        return;
    }
    
    if (listen(server_fd_, 10) < 0) {
        std::cerr << "Error listening" << std::endl;
        close(server_fd_);
        return;
    }
    
    running_ = true;
    std::cout << "Server started on port " << port_ << std::endl;
    
    while (running_) {
        struct sockaddr_in client_address;
        socklen_t client_len = sizeof(client_address);
        int client_fd = accept(server_fd_, (struct sockaddr *)&client_address, &client_len);
        
        if (client_fd < 0) {
            if (running_) {
                std::cerr << "Error accepting connection" << std::endl;
            }
            continue;
        }
        
        // Handle each request in the current thread (simple approach)
        // For production, use thread pool
        handleRequest(client_fd);
    }
}

void SimpleHTTPServer::stop() {
    running_ = false;
    if (server_fd_ >= 0) {
        close(server_fd_);
        server_fd_ = -1;
    }
}

