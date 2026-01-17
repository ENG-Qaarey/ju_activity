# PowerShell script to start backend and frontend with ngrok
# Usage: .\start-ngrok.ps1

Write-Host "Starting JU Activity Hub with Ngrok..." -ForegroundColor Green

# Start Backend
Write-Host "`n[1/4] Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; npm run start:dev"

Start-Sleep -Seconds 3

# Start Frontend
Write-Host "[2/4] Starting Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\ju-activity'; npm run dev"

Start-Sleep -Seconds 3

# Start Backend Ngrok (Free Plan - Random Subdomain)
Write-Host "[3/4] Starting Ngrok for Backend (port 3001)..." -ForegroundColor Yellow
Write-Host "   Check ngrok terminal for the actual backend URL" -ForegroundColor Cyan
Write-Host "   URL will be shown as: https://xxxxx.ngrok-free.app" -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; ngrok http 3001"

Start-Sleep -Seconds 2

# Start Frontend Ngrok (Free Plan - Random Subdomain)
Write-Host "[4/4] Starting Ngrok for Frontend (port 8080)..." -ForegroundColor Yellow
Write-Host "   Check ngrok terminal for the actual frontend URL" -ForegroundColor Cyan
Write-Host "   URL will be shown as: https://xxxxx.ngrok-free.dev" -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; ngrok http 8080"

Start-Sleep -Seconds 3

Write-Host "`n✅ All services started!" -ForegroundColor Green
Write-Host "`n📝 IMPORTANT STEPS:" -ForegroundColor Yellow
Write-Host "   1. Look at the ngrok terminal windows for your actual URLs:" -ForegroundColor White
Write-Host "      - Backend URL: https://xxxxx.ngrok-free.app (from terminal 3)" -ForegroundColor Cyan
Write-Host "      - Frontend URL: https://xxxxx.ngrok-free.dev (from terminal 4)" -ForegroundColor Cyan
Write-Host "   2. Copy the BACKEND URL and create ju-activity/.env:" -ForegroundColor White
Write-Host "      VITE_API_URL=https://your-backend-url.ngrok-free.app/api" -ForegroundColor Green
Write-Host "   3. Restart the frontend server (terminal 2)" -ForegroundColor White
Write-Host "   4. Open the frontend ngrok URL in your browser!" -ForegroundColor Cyan
Write-Host "`n💡 TIP: Ngrok URLs change each time. Update .env if you restart ngrok." -ForegroundColor Yellow
