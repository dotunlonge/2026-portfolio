#include "server.h"
#include "../include/api.h"
#include <iostream>
#include <signal.h>
#include <csignal>
#include <cstdlib>
#include <cstring>

SimpleHTTPServer* g_server = nullptr;

void signalHandler(int signum) {
    std::cout << "\nShutting down server..." << std::endl;
    if (g_server) {
        g_server->stop();
    }
    exit(signum);
}

int main() {
    signal(SIGINT, signalHandler);
    signal(SIGTERM, signalHandler);
    
    // Read PORT from environment variable (Railway provides this)
    const char* port_env = std::getenv("PORT");
    int port = port_env ? std::atoi(port_env) : 8080;
    
    SimpleHTTPServer server(port);
    g_server = &server;
    
    // API Routes
    server.addRoute("/api/personal", []() {
        return api::getPersonalInfoJson();
    });
    
    server.addRoute("/api/projects", []() {
        return api::getProjectsJson();
    });
    
    server.addRoute("/api/blog", []() {
        return api::getBlogPostsJson();
    });
    
    server.addRouteWithParam("/api/blog/:id", [](const std::string& id) {
        return api::getBlogPostJson(id);
    });
    
    server.addRoute("/api/work-experience", []() {
        return api::getWorkExperienceJson();
    });
    
    server.addRouteWithParam("/api/games/:id/leaderboard", [](const std::string& id) {
        return api::getLeaderboardJson(id);
    });
    
    std::cout << "Starting Portfolio Server..." << std::endl;
    std::cout << "API Endpoints:" << std::endl;
    std::cout << "  GET /api/personal" << std::endl;
    std::cout << "  GET /api/projects" << std::endl;
    std::cout << "  GET /api/blog" << std::endl;
    std::cout << "  GET /api/blog/:id" << std::endl;
    std::cout << "  GET /api/work-experience" << std::endl;
    std::cout << "  GET /api/games/:id/leaderboard" << std::endl;
    std::cout << std::endl;
    
    server.start();
    
    return 0;
}

