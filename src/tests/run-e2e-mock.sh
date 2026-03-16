#!/bin/bash

# Start Mock API in background
node tests/mock-api.js > mock.log 2>&1 &
MOCK_PID=$!

echo "Mock API started with PID $MOCK_PID"

# Export env vars for Next.js to use Mock API
export ADMIN_API_URL=http://localhost:5050
export NEXT_PUBLIC_ADMIN_API_URL=http://localhost:5050
export NEXT_PUBLIC_API_URL=http://localhost:5050
export NEXTAUTH_URL=http://localhost:3001
export CLIENT_URL=http://localhost:3001
export AUTH_SECRET=secret-for-testing

# Run Playwright tests (todos los specs modulares + admin-e2e-mocked)
npx playwright test

EXIT_CODE=$?

# Cleanup
kill $MOCK_PID
echo "Mock API stopped"

exit $EXIT_CODE
