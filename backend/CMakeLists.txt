cmake_minimum_required(VERSION 3.10)
project(PortfolioServer)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find Crow (assuming it's installed via vcpkg or as submodule)
find_path(CROW_INCLUDE_DIR crow.h
    PATHS
    ${CMAKE_SOURCE_DIR}/third_party/crow/include
    /usr/local/include
    /usr/include
)

# If Crow is not found, we'll use a simple HTTP server approach
if(NOT CROW_INCLUDE_DIR)
    message(STATUS "Crow not found, using simple HTTP server")
    add_executable(portfolio-server
        src/main.cpp
        src/server.cpp
        src/server.h
        src/api.cpp
    )
else()
    message(STATUS "Using Crow framework")
    add_executable(portfolio-server
        src/main.cpp
    )
    target_include_directories(portfolio-server PRIVATE ${CROW_INCLUDE_DIR})
endif()

target_include_directories(portfolio-server PRIVATE
    ${CMAKE_SOURCE_DIR}/include
)

# Link libraries
find_package(Threads REQUIRED)
target_link_libraries(portfolio-server PRIVATE Threads::Threads)

