#pragma once

#include <string>
#include <functional>
#include <map>

class SimpleHTTPServer {
public:
    SimpleHTTPServer(int port);
    ~SimpleHTTPServer();
    
    void addRoute(const std::string& path, std::function<std::string()> handler);
    void addRouteWithParam(const std::string& path, std::function<std::string(const std::string&)> handler);
    void start();
    void stop();
    
private:
    int port_;
    int server_fd_;
    bool running_;
    std::map<std::string, std::function<std::string()>> routes_;
    std::map<std::string, std::function<std::string(const std::string&)>> param_routes_;
    
    void handleRequest(int client_fd);
    std::string parsePath(const std::string& request);
    std::string createResponse(const std::string& body, const std::string& contentType = "application/json", int statusCode = 200);
    std::string readFile(const std::string& path);
    std::string getAllowedOrigin();
};

