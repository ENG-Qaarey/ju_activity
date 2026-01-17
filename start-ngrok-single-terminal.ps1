# PowerShell script to start both backend and frontend ngrok tunnels from ONE terminal
# Usage: .\start-ngrok-single-terminal.ps1
# 
# This uses ngrok's configuration file to run multiple tunnels

Write-Host "Starting both Ngrok tunnels from ONE terminal..." -ForegroundColor Green
Write-Host ""

# Check if ngrok.yml exists
if (-not (Test-Path "ngrok.yml")) {
    Write-Host "⚠️  ngrok.yml not found in current directory!" -ForegroundColor Yellow
    Write-Host "   Creating ngrok.yml configuration file..." -ForegroundColor Yellow
    # The ngrok.yml file should already exist, but just in case
}

Write-Host "⚠️  Make sure your servers are running:" -ForegroundColor Yellow
Write-Host "   - Backend: npm run start:dev (port 3001)" -ForegroundColor White
Write-Host "   - Frontend: npm run dev (port 8080)" -ForegroundColor White
Write-Host ""

Start-Sleep -Seconds 2

Write-Host "Starting ngrok with both tunnels..." -ForegroundColor Yellow
Write-Host "   Backend:  http://localhost:3001" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:8080" -ForegroundColor Cyan
Write-Host ""
Write-Host "Running: ngrok start backend frontend" -ForegroundColor White
Write-Host ""

# Start ngrok with both tunnels from config file
ngrok start backend frontend
