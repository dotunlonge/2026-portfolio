#pragma once

#include <string>
#include <vector>
#include <map>

namespace api {
    struct Project {
        std::string name;
        std::string description;
        std::string period;
        std::vector<std::string> technologies;
        std::string highlight;
    };

    struct BlogPost {
        std::string id;
        std::string title;
        std::string excerpt;
        std::string content;
        std::string date;
        std::string category;
    };

    struct PersonalInfo {
        std::string name;
        std::string title;
        std::string location;
        std::string phone;
        std::string email;
        std::string github;
        std::string website;
        std::string linkedin;
        std::string summary;
        std::vector<std::string> skills;
    };

    std::string getProjectsJson();
    std::string getBlogPostsJson();
    std::string getBlogPostJson(const std::string& id);
    std::string getPersonalInfoJson();
    std::string getWorkExperienceJson();
}

