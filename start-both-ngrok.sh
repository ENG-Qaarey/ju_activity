#!/bin/bash
# Bash script to start both backend and frontend ngrok tunnels
# Usage: ./start-both-ngrok.sh

echo "Starting both Ngrok tunnels..."
echo ""

# Check if backend and frontend servers are running
echo "⚠️  Make sure your servers are running:"
echo "   - Backend: npm run start:dev (port 3001)"
echo "   - Frontend: npm run dev (port 8080)"
echo ""

sleep 2

# Start Backend Ngrok in background
echo "[1/2] Starting Backend Ngrok (port 3001)..."
ngrok http 3001 &
NGROK_BACKEND_PID=$!

sleep 1

# Start Frontend Ngrok in background
echo "[2/2] Starting Frontend Ngrok (port 8080)..."
ngrok http 8080 &
NGROK_FRONTEND_PID=$!

sleep 2

echo ""
echo "✅ Both ngrok tunnels started!"
echo ""
echo "📋 Your ngrok tunnels are running in the background"
echo "   - Backend tunnel (PID: $NGROK_BACKEND_PID)"
echo "   - Frontend tunnel (PID: $NGROK_FRONTEND_PID)"
echo ""
echo "💡 TIP: View all tunnels at http://127.0.0.1:4040"
echo ""
echo "📝 To stop both tunnels, run:"
echo "   kill $NGROK_BACKEND_PID $NGROK_FRONTEND_PID"
echo ""
