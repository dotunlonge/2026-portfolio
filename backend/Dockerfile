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

# Copy source files
COPY backend/CMakeLists.txt backend/
COPY backend/include/ backend/include/
COPY backend/src/ backend/src/

# Build the application
WORKDIR /app/backend
RUN mkdir -p build && cd build && \
    cmake .. && \
    make

# Runtime stage
FROM ubuntu:22.04

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    libstdc++6 \
    && rm -rf /var/lib/apt/lists/*

# Copy binary from builder
COPY --from=builder /app/backend/build/portfolio-server /usr/local/bin/portfolio-server

# Expose port
EXPOSE 8080

# Run the server
CMD ["portfolio-server"]

