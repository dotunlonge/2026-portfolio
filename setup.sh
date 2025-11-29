#!/bin/bash

echo "🚀 Setting up Portfolio Project..."
echo ""

# Check for required tools
echo "Checking for required tools..."

if ! command -v cmake &> /dev/null; then
    echo "❌ CMake not found. Please install CMake 3.10+"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm"
    exit 1
fi

echo "✅ All required tools found"
echo ""

# Setup frontend
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "🔨 Building backend..."
cd backend
mkdir -p build
cd build
cmake ..
make
cd ../..

echo ""
echo "✅ Setup complete!"
echo ""
echo "To run the application:"
echo "  1. Start backend:  cd backend/build && ./portfolio-server"
echo "  2. Start frontend: cd frontend && npm run dev"
echo ""
echo "Or use: make all"

