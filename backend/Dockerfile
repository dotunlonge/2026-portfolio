# Alternative Dockerfile for backend when building from project root
# Use this if Railway doesn't detect the backend/Dockerfile automatically
# Or rename this to Dockerfile and place in project root

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

# Copy source files (from project root)
COPY backend/CMakeLists.txt ./
COPY backend/include/ ./include/
COPY backend/src/ ./src/

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
# Use exec form with full path
CMD ["/usr/local/bin/portfolio-server"]

