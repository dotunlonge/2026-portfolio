# Railway-specific Dockerfile
# This assumes Railway root directory is set to "backend"
# If using from project root, use the paths in the main Dockerfile

# Build stage
FROM ubuntu:22.04 AS builder

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    g++ \
    make \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy source files (relative to backend/ directory)
COPY CMakeLists.txt ./
COPY include/ ./include/
COPY src/ ./src/

# Build the application
RUN mkdir -p build && cd build && \
    cmake .. && \
    make

# Runtime stage
FROM ubuntu:22.04

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    libc6 \
    libstdc++6 \
    && rm -rf /var/lib/apt/lists/*

# Copy binary from builder
COPY --from=builder /app/build/portfolio-server /usr/local/bin/portfolio-server

# Expose port (Railway sets PORT env var automatically)
EXPOSE 8080

# Run the server (reads PORT from environment)
CMD ["portfolio-server"]

