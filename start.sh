#!/bin/bash
# Funmi's Aesthetics — Start Script

echo ""
echo "╔══════════════════════════════════════╗"
echo "║     Funmi's Aesthetics Platform      ║"
echo "╚══════════════════════════════════════╝"
echo ""

# Backend
echo "▶  Starting API server (port 5000)..."
cd backend && node src/server.js &
BACKEND_PID=$!

# Frontend
echo "▶  Starting Next.js (port 3000)..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers running:"
echo "   Frontend  → http://localhost:3000"
echo "   Backend   → http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both."

trap "kill $BACKEND_PID $FRONTEND_PID" EXIT
wait
