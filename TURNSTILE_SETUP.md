# Cloudflare Turnstile Setup Guide

This guide explains how to set up Cloudflare Turnstile for bot protection in both development and production environments.

## Overview

Cloudflare Turnstile is implemented in the following authentication forms:

- Login
- Signup
- Forgot Password
- Reset Password

The implementation is designed to be flexible and work in environments where Turnstile is not configured.

## Environment Variables

Add these variables to your `.env` file:

```bash
# Frontend - Site Key (visible to clients)
NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY=your_site_key_here

# Backend - Secret Key (server-side only)
CF_TURNSTILE_SECRET_KEY=your_secret_key_here

# Verification URL (optional - defaults to Cloudflare's endpoint)
CF_TURNSTILE_VERIFY_URL=https://challenges.cloudflare.com/turnstile/v0/siteverify
```

## Development Environment Setup

### Option 1: Skip Turnstile (Recommended for local development)

Simply don't set the Turnstile environment variables. The system will automatically:

- Show a development warning message instead of the Turnstile widget
- Skip server-side verification
- Allow form submissions to proceed

### Option 2: Use Turnstile in Development

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to Turnstile
3. Create a new site
4. Use `localhost` or your development domain
5. Copy the Site Key and Secret Key
6. Add them to your `.env` file

## Production Environment Setup

### Step 1: Create Turnstile Site

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to Turnstile
3. Click "Add a site"
4. Configure the site:
    - **Site name**: Your app name (e.g., "Shrnkly Production")
    - **Domain**: Your production domain (e.g., `yourdomain.com`)
    - **Widget mode**: Managed (recommended)
    - **Pre-clearance**: Optional

### Step 2: Configure Environment Variables

Add the keys to your production environment:

```bash
NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY=your_production_site_key
CF_TURNSTILE_SECRET_KEY=your_production_secret_key
```

### Step 3: Deploy and Test

1. Deploy your application
2. Test the authentication forms
3. Check browser console for any Turnstile errors
4. Verify server logs for verification success/failure

## Troubleshooting

### Common Issues

1. **"Turnstile disabled" message in production**
    - Check that `NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY` is set
    - Verify the site key is correct
    - Ensure the domain matches what's configured in Cloudflare

2. **Widget loads but verification fails**
    - Check that `CF_TURNSTILE_SECRET_KEY` is set on the server
    - Verify the secret key matches the site key
    - Check server logs for detailed error messages

3. **Widget doesn't appear**
    - Verify the site key is correct
    - Check browser console for JavaScript errors
    - Ensure your domain is added to the Turnstile site configuration

4. **Network errors during verification**
    - Check firewall rules (Turnstile needs to reach Cloudflare's API)
    - Verify the verification URL is accessible
    - In development, network errors are automatically bypassed

### Testing Turnstile

You can test Turnstile behavior by:

1. **Success case**: Complete the challenge normally
2. **Failure case**: Use browser dev tools to modify the token
3. **Timeout case**: Wait for the token to expire (5 minutes)
4. **Error case**: Use an invalid site key

### Debug Mode

Enable debug logging by checking server console output. The service will log:

- Verification attempts
- Success/failure status
- Error codes from Cloudflare
- Development bypasses

## Security Considerations

1. **Never expose the secret key** - Only use it server-side
2. **Validate on server** - Always verify tokens server-side, never trust client-side validation
3. **Domain restrictions** - Configure specific domains in Turnstile settings
4. **Rate limiting** - Consider additional rate limiting for auth endpoints
5. **Monitor usage** - Check Cloudflare analytics for bot detection patterns

## API Integration

The Turnstile token is automatically included in authentication requests as `cfToken`. The server:

1. Validates the token format
2. Sends it to Cloudflare for verification
3. Checks the response for success/failure
4. Allows or blocks the authentication attempt

In development without Turnstile configured, all verifications return `true` to allow testing.

## Support

If you encounter issues:

1. Check the [Cloudflare Turnstile documentation](https://developers.cloudflare.com/turnstile/)
2. Review server logs for detailed error messages
3. Test with browser dev tools network tab to see API calls
4. Verify environment variables are correctly set

## Configuration Summary

| Environment             | Site Key Required | Secret Key Required | Behavior                           |
| ----------------------- | ----------------- | ------------------- | ---------------------------------- |
| Development (no keys)   | ❌ No             | ❌ No               | Shows warning, allows all requests |
| Development (with keys) | ✅ Yes            | ✅ Yes              | Full Turnstile validation          |
| Production              | ✅ Yes            | ✅ Yes              | Full Turnstile validation          |

