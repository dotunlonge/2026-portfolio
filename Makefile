.PHONY: build-backend build-frontend build all run-backend run-frontend clean install

# Build backend
build-backend:
	cd backend && mkdir -p build && cd build && cmake .. && make

# Build frontend
build-frontend:
	cd frontend && npm install && npm run build

# Build both
build: build-backend build-frontend

# Run backend
run-backend:
	cd backend/build && ./portfolio-server

# Run frontend
run-frontend:
	cd frontend && npm run dev

# Install dependencies
install:
	cd frontend && npm install

# Clean build artifacts
clean:
	rm -rf backend/build
	rm -rf frontend/dist
	rm -rf frontend/node_modules

# Run both (in background)
all: build
	@echo "Starting backend and frontend..."
	@cd backend/build && ./portfolio-server & echo $$! > ../server.pid
	@cd frontend && npm run dev & echo $$! > ../frontend.pid
	@echo "Backend running on http://localhost:8080"
	@echo "Frontend running on http://localhost:3000"
	@echo "Stop servers with: make stop"

stop:
	@if [ -f backend/server.pid ]; then kill $$(cat backend/server.pid) && rm backend/server.pid; fi
	@if [ -f frontend/frontend.pid ]; then kill $$(cat frontend/frontend.pid) && rm frontend/frontend.pid; fi
	@echo "Servers stopped"

