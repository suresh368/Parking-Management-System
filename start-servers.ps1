# Start both frontend and backend servers

Write-Host "🚀 Starting Parking Management System with MongoDB" -ForegroundColor Cyan
Write-Host "================================================`n" -ForegroundColor Cyan

# Start backend in a new terminal
Write-Host "📦 Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'd:\parking management system\server'; Write-Host '🔧 Backend Server' -ForegroundColor Green; npm run dev"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start frontend in a new terminal  
Write-Host "🎨 Starting Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'd:\parking management system'; Write-Host '💻 Frontend Server' -ForegroundColor Green; npm run dev"

Write-Host "`n✅ Both servers are starting!" -ForegroundColor Green
Write-Host "================================================`n" -ForegroundColor Cyan

Write-Host "📋 Server Information:" -ForegroundColor Yellow
Write-Host "   Backend API: http://localhost:5000" -ForegroundColor White
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "   MongoDB: mongodb://localhost:27017`n" -ForegroundColor White

Write-Host "🔐 Default Login:" -ForegroundColor Yellow
Write-Host "   Username: admin" -ForegroundColor White
Write-Host "   Password: admin123`n" -ForegroundColor White

Write-Host "💡 Tip: Use MongoDB Compass to view your data in real-time!`n" -ForegroundColor Cyan
