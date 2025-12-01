# Oludotun Longe - Developer Portfolio

A beautiful, professional, minimal developer portfolio built with C++ backend and React frontend.

## Tech Stack

- **Backend**: C++ HTTP Server (Simple HTTP server implementation)
- **Frontend**: React with TanStack Router & TanStack Query
- **Styling**: Modern CSS with minimal, dark theme design

## Features

- Professional portfolio showcasing key projects (Bange.io, Omni Brain, Linda Ikeji TV)
- Blog with sci-fi articles about time travel, space, origins of life, and the future
- Minimal, beautiful dark-themed design
- Fast C++ backend API
- Responsive design for all devices

## Quick Start

### Using Make (Recommended)

```bash
# Install frontend dependencies
make install

# Build both backend and frontend
make build

# Run both servers
make all

# Stop servers
make stop
```

### Manual Setup

#### Backend (C++)

```bash
cd backend
mkdir -p build && cd build
cmake ..
make
./portfolio-server
```

The backend will start on `http://localhost:8080`

#### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

## API Endpoints

- `GET /api/personal` - Personal information
- `GET /api/projects` - List of key projects
- `GET /api/blog` - List of blog posts
- `GET /api/blog/:id` - Individual blog post

## Project Structure

```
.
├── backend/           # C++ HTTP server
│   ├── src/          # Source files
│   ├── include/      # Header files
│   └── CMakeLists.txt
├── frontend/         # React application
│   ├── src/
│   │   ├── routes/   # TanStack Router routes
│   │   └── ...
│   └── package.json
└── README.md
```

## Requirements

- C++17 or later
- CMake 3.10+
- Node.js 18+
- npm or yarn
- Make (optional, for convenience scripts)

## Development

The frontend uses Vite for fast HMR (Hot Module Replacement). The backend is a simple HTTP server that can be rebuilt when changes are made.

## License

MIT

# 2026-portfolio
