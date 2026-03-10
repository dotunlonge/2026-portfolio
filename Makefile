.PHONY: build-backend build-frontend build all run-backend run-frontend clean install

# Build backend
build-backend:
	$(MAKE) -C backend build

# Build frontend
build-frontend:
	cd frontend && npm install && npm run build

# Build both
build: build-backend build-frontend

# Run frontend
run-frontend:
	cd frontend && npm run dev

# Watch backend for changes and rebuild/restart
watch-backend:
	$(MAKE) -C backend watch-backend

# Helper to run backend in background
run-backend-bg:
	$(MAKE) -C backend run-bg

# Helper to stop backend
stop-backend:
	$(MAKE) -C backend stop

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

stop: stop-backend
	@if [ -f frontend/frontend.pid ]; then kill $$(cat frontend/frontend.pid) && rm frontend/frontend.pid; fi
	@echo "Servers stopped"

