# Infisical Commands Reference

With `prod` set as the default environment, here are the available commands:

## 🚀 Development Commands

```bash
# Default: Uses prod environment (as set in .infisical.json)
npm run dev

# Explicitly use production environment
npm run dev:prod

# Use development/staging environment
npm run dev:staging

# Local development without Infisical
npm run dev:local
```

## 🏗️ Build Commands

```bash
# Default build: Uses prod environment
npm run build

# Explicitly build with production environment
npm run build:prod

# Local build without Infisical
npm run build:local
```

## ▶️ Start Commands

```bash
# Default start: Uses prod environment
npm start

# Explicitly start with production environment
npm run start:prod

# Local start without Infisical
npm run start:local
```

## 🔍 Testing Infisical Connection

```bash
# Test connection with default environment (prod)
infisical run -- printenv | grep TURNSTILE

# Test with specific environment
infisical run --env=prod -- printenv | grep TURNSTILE
infisical run --env=dev -- printenv | grep TURNSTILE

# List all environment variables
infisical run -- printenv
```

## 📋 Environment Setup Checklist

### For Production Environment (`prod`):

- [ ] Login to Infisical: `infisical login`
- [ ] Add `NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY` (your production site key)
- [ ] Add `CF_TURNSTILE_SECRET_KEY` (your production secret key)
- [ ] Add `CF_TURNSTILE_VERIFY_URL` (optional, defaults to Cloudflare's endpoint)
- [ ] Add other production environment variables (database, API keys, etc.)

### For Development Environment (`dev`):

- [ ] Add development/staging versions of Turnstile keys
- [ ] Add development database URLs and API endpoints
- [ ] Configure for `localhost` domain

## 🔧 Quick Setup for Production

1. **Authenticate:**

    ```bash
    infisical login
    ```

2. **Test connection:**

    ```bash
    infisical run -- echo "Connected to prod environment"
    ```

3. **Add Turnstile variables in your Infisical dashboard:**
    - Environment: `prod`
    - `NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY`: Your production Cloudflare site key
    - `CF_TURNSTILE_SECRET_KEY`: Your production Cloudflare secret key

4. **Start development:**
    ```bash
    npm run dev  # Uses prod environment by default
    ```

## 🚨 Important Notes

- **Default environment is `prod`** - All commands without explicit `--env` will use production values
- **Use `dev:staging` for development** - This uses the `dev` environment in Infisical
- **Use `:local` variants for testing** - These bypass Infisical and use `.env` files
- **Turnstile works gracefully** - Shows warnings instead of breaking when keys aren't set

## 💡 Recommended Workflow

1. **Development**: Use `npm run dev:staging` or `npm run dev:local`
2. **Testing Production Config**: Use `npm run dev:prod`
3. **Production Build**: Use `npm run build` (uses prod by default)
4. **Production Deploy**: Use `npm start` (uses prod by default)

This setup ensures you're always working with the right environment variables for your deployment context!
