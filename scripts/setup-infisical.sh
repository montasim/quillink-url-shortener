#!/bin/bash

echo "🔧 Infisical + Turnstile Setup Script"
echo "===================================="

# Check if Infisical CLI is installed
if ! command -v infisical &> /dev/null; then
    echo "❌ Infisical CLI not found. Installing..."
    npm install -g @infisical/cli
else
    echo "✅ Infisical CLI found: $(infisical --version)"
fi

# Check if user is logged in
echo ""
echo "🔐 Checking Infisical authentication..."
if infisical run --env=dev -- echo "Auth test" &> /dev/null; then
    echo "✅ Infisical authentication successful"
else
    echo "❌ Infisical authentication failed"
    echo "Please run: infisical login"
    exit 1
fi

# Check current environment variables
echo ""
echo "🔍 Checking current Turnstile environment variables..."
echo "NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY: $(infisical run --env=dev -- printenv NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY 2>/dev/null || echo 'Not set')"
echo "CF_TURNSTILE_SECRET_KEY: $(infisical run --env=dev -- printenv CF_TURNSTILE_SECRET_KEY 2>/dev/null | sed 's/./*/g' || echo 'Not set')"
echo "CF_TURNSTILE_VERIFY_URL: $(infisical run --env=dev -- printenv CF_TURNSTILE_VERIFY_URL 2>/dev/null || echo 'Not set')"

# Test the application
echo ""
echo "🚀 Testing application startup..."
echo "Starting development server with Infisical..."
echo "If you see Turnstile warnings, that's normal when keys aren't configured."
echo ""
echo "Press Ctrl+C to stop the server when ready."
echo ""

# Start the dev server
npm run dev