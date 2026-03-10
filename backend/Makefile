.PHONY: build watch-backend run-bg stop clean

# Build backend
build:
	mkdir -p build && cd build && cmake .. && make

# Run backend in background
run-bg:
	@cd build && ./portfolio-server & echo $$! > ../server.pid
	@echo "Backend started in background"

# Stop backend
stop:
	@if [ -f server.pid ]; then \
		PID=$$(cat server.pid); \
		kill $$PID 2>/dev/null || true; \
		rm server.pid; \
		echo "Stopped backend (PID $$PID)"; \
	fi
	@pkill portfolio-server 2>/dev/null || true

# Watch for changes and rebuild/restart
watch-backend:
	@echo "Watching src for changes..."
	@LAST_SUM=""; \
	while true; do \
		CURRENT_SUM=$$(ls -lR src | md5); \
		if [ "$$CURRENT_SUM" != "$$LAST_SUM" ]; then \
			if [ "$$LAST_SUM" != "" ]; then \
				echo "Changes detected, rebuilding..."; \
				$(MAKE) stop; \
				$(MAKE) build; \
				$(MAKE) run-bg; \
			else \
				$(MAKE) build; \
				$(MAKE) run-bg; \
			fi; \
			LAST_SUM="$$CURRENT_SUM"; \
		fi; \
		sleep 2; \
	done

clean:
	rm -rf build
	rm -f server.pid
