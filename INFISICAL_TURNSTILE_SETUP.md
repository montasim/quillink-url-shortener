# Infisical + Turnstile Setup Guide

This guide explains how to set up Cloudflare Turnstile with Infisical environment management.

## Current Issues

Your project is configured to use Infisical for environment variables, but there are some setup issues:

1. No default environment set in `.infisical.json`
2. Missing Turnstile environment variables in Infisical
3. Need to authenticate Infisical CLI

## Quick Fix for Development

### Option 1: Use .env file temporarily (Recommended for testing)

1. Create a `.env` file with your Turnstile variables:

```bash
NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY=your_site_key_here
CF_TURNSTILE_SECRET_KEY=your_secret_key_here
CF_TURNSTILE_VERIFY_URL=https://challenges.cloudflare.com/turnstile/v0/siteverify
```

2. Modify your npm scripts temporarily to use .env instead of Infisical:

```json
{
    "scripts": {
        "dev": "next dev --turbopack",
        "start": "next start"
    }
}
```

### Option 2: Proper Infisical Setup

1. **Login to Infisical:**

```bash
infisical login
```

2. **Set default environment in .infisical.json:**

```json
{
    "workspaceId": "1ac8aabb-7ed6-42ff-9f25-b78dc1a8f9ea",
    "defaultEnvironment": "prod",
    "gitBranchToEnvironmentMapping": null
}
```

**✅ Already configured!** Your project is now set to use the `prod` environment by default.

3. **Add Turnstile variables to your Infisical project:**
    - Go to your Infisical dashboard
    - Navigate to your project
    - Add these environment variables:
        - `NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY`
        - `CF_TURNSTILE_SECRET_KEY`
        - `CF_TURNSTILE_VERIFY_URL`

4. **Test the setup:**

```bash
# Test with production environment (default)
infisical run -- echo "Testing Infisical with prod environment"

# Or explicitly specify prod
infisical run --env=prod -- echo "Testing Infisical"

# For development testing, use:
infisical run --env=dev -- echo "Testing Infisical with dev environment"
```

## Current Turnstile Implementation Status

The Turnstile implementation I've created is **environment-agnostic** and will work with both `.env` files and Infisical:

### ✅ What's Working:

- **Graceful fallback** when Turnstile keys are missing
- **Development warnings** instead of crashes
- **Conditional verification** based on key availability
- **All auth forms updated** (login, signup, forgot-password, reset-password)

### 🔧 What Needs Your Action:

1. **Set up Turnstile keys** in your Infisical project
2. **Configure default environment** in `.infisical.json`
3. **Authenticate Infisical CLI**

## Environment Variables Needed in Infisical

Add these to your Infisical project:

```bash
# Frontend (Public)
NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY=your_cloudflare_site_key

# Backend (Secret)
CF_TURNSTILE_SECRET_KEY=your_cloudflare_secret_key

# Optional (has default)
CF_TURNSTILE_VERIFY_URL=https://challenges.cloudflare.com/turnstile/v0/siteverify
```

## Testing Without Turnstile

If you want to test immediately without setting up Turnstile:

1. **Don't set any Turnstile variables** in Infisical
2. **Run with Infisical:** `npm run dev`
3. **You'll see development warnings** instead of Turnstile widgets
4. **All forms will work** without bot protection

## Get Your Turnstile Keys

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to "Turnstile"
3. Create a new site:
    - **Domain:** `localhost` (for development)
    - **Widget mode:** Managed
4. Copy the **Site Key** and **Secret Key**
5. Add them to your Infisical project

## Verification Commands

After setup, verify everything works:

```bash
# Check Infisical connection
infisical run --env=dev -- printenv | grep TURNSTILE

# Start development server
npm run dev

# Build for production
npm run build
```

## Production Setup

For production, create a separate environment in Infisical:

1. Create "production" environment in Infisical
2. Add production Turnstile keys (with your real domain)
3. Update `.infisical.json` or use environment-specific commands:

```bash
infisical run --env=production -- npm start
```

## Troubleshooting

### "infisical: command not found"

```bash
npm install -g @infisical/cli
infisical login
```

### "No default environment"

Update `.infisical.json`:

```json
{
    "workspaceId": "your-workspace-id",
    "defaultEnvironment": "dev"
}
```

### Turnstile not working

1. Check if variables are set: `infisical run -- printenv | grep TURNSTILE`
2. Verify site key in browser dev tools
3. Check server logs for verification errors

The current implementation will show helpful warnings and work gracefully whether or not Turnstile is configured!
