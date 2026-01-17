#!/bin/bash
# Bash script to start backend and frontend with ngrok
# Usage: ./start-ngrok.sh

echo "Starting JU Activity Hub with Ngrok..."

# Start Backend
echo -e "\n[1/4] Starting Backend Server..."
cd backend && npm run start:dev &
BACKEND_PID=$!

sleep 3

# Start Frontend
echo "[2/4] Starting Frontend Server..."
cd ../ju-activity && npm run dev &
FRONTEND_PID=$!

sleep 3

# Start Backend Ngrok (Free Plan - Random Subdomain)
echo "[3/4] Starting Ngrok for Backend (port 3001)..."
echo "   Check ngrok output for the actual backend URL"
echo "   URL will be shown as: https://xxxxx.ngrok-free.app"
ngrok http 3001 &
NGROK_BACKEND_PID=$!

sleep 2

# Start Frontend Ngrok (Free Plan - Random Subdomain)
echo "[4/4] Starting Ngrok for Frontend (port 8080)..."
echo "   Check ngrok output for the actual frontend URL"
echo "   URL will be shown as: https://xxxxx.ngrok-free.dev"
ngrok http 8080 &
NGROK_FRONTEND_PID=$!

sleep 3

echo -e "\n✅ All services started!"
echo -e "\n📝 IMPORTANT STEPS:"
echo "   1. Look at the ngrok output for your actual URLs:"
echo "      - Backend URL: https://xxxxx.ngrok-free.app"
echo "      - Frontend URL: https://xxxxx.ngrok-free.dev"
echo "   2. Copy the BACKEND URL and create ju-activity/.env:"
echo "      VITE_API_URL=https://your-backend-url.ngrok-free.app/api"
echo "   3. Restart the frontend server"
echo "   4. Open the frontend ngrok URL in your browser!"
echo -e "\n💡 TIP: Ngrok URLs change each time. Update .env if you restart ngrok."

# Wait for user to stop
echo -e "\nPress Ctrl+C to stop all services..."
wait
