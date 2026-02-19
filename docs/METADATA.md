# Metadata Configuration for Shrnkly

This document describes the metadata (title, description, Open Graph) configuration for all pages in the application.

## Root Layout (`app/layout.tsx`)

Base metadata that applies to all pages:

```typescript
export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: `${projectName} – Smart URL Shortener, Text Sharing & QR Code Generator`,
        template: `%s | ${projectName}`,
    },
    description: 'Free URL shortener with analytics, secure text sharing, and custom QR codes.',
    keywords: ['URL shortener', 'QR code generator', 'text sharing', 'analytics'],
    // ... Open Graph, Twitter, robots configuration
};
```

## Page-Specific Metadata

### Public Home Pages

| Page | Title | Description |
|------|-------|-------------|
| `/` | Smart URL Shortener, Text Sharing & QR Code Generator | Free URL shortener with analytics, secure text sharing, and custom QR codes. Create trackable links in seconds. |
| `/urls` | URL Shortener – Create Short Links with Analytics | Free URL shortener with real-time analytics, custom slugs, and QR codes. |
| `/texts` | Text Sharing – Share Code & Notes Securely | Share code snippets with password protection and auto-expiration. Syntax highlighting for 100+ languages. |
| `/qr` | Free QR Code Generator – Custom & Printable | Generate custom QR codes for URLs, text, WiFi, and contacts. Free, no signup. |
| `/pricing` | Pricing Plans – Free & Premium | Choose your plan: Free tier with 10 links, or Premium with unlimited URLs. |
| `/contact` | Contact Us – Get Support | Get help with URL shortening, text sharing, or QR codes. |
| `/privacy` | Privacy Policy | Learn how we collect, use, and protect your data. |
| `/terms` | Terms of Service | Terms and conditions for using our services. |

### Authentication Pages

| Page | Title | Description |
|------|-------|-------------|
| `/login` | Log In | Access your dashboard to manage short links and view analytics. |
| `/signup` | Sign Up – Create Free Account | Create a free account to unlock advanced features and analytics. |
| `/forgot-password` | Reset Password | Reset your account password. |
| `/reset-password` | Set New Password | Create a new secure password. |

### Dashboard Pages (Protected)

| Page | Title | Description |
|------|-------|-------------|
| `/dashboard` | Dashboard – Overview | View your link performance and traffic analytics. |
| `/dashboard/urls` | My Links – Manage & Track | Manage all your short links and view click analytics. |
| `/dashboard/texts` | My Text Shares – Manage & Track | Manage your shared text snippets and view access logs. |

### Dynamic Pages

| Page | Title | Description | Robots |
|------|-------|-------------|--------|
| `/[shortKey]` | Redirecting… | Redirecting to destination URL. | noindex |
| `/texts/[shortKey]` | {title} – Shared via Shrnkly | Shared text snippet. | noindex |
| `/dashboard/urls/[shortKey]` | Link Analytics – {shortKey} | Detailed analytics for your short link. | noindex |
| `/dashboard/texts/[shortKey]` | Share Analytics – {shortKey} | View analytics for your shared text. | noindex |

## Implementation Notes

1. **Root layout** contains base metadata with Open Graph and Twitter Card configuration
2. **Home pages** should have unique, descriptive titles and descriptions for SEO
3. **Auth pages** should have clear, action-oriented titles
4. **Dashboard pages** are protected and should have `noindex` robots directive
5. **Dynamic pages** should use `generateMetadata` function for dynamic titles
6. **Text share pages** should have `noindex, nofollow` to prevent indexing private content

## Open Graph Configuration

All pages should include:
- `og:type`: 'website' (or 'article' for shared text)
- `og:title`: Page-specific title
- `og:description`: Page-specific description
- `og:url`: Canonical URL
- `og:site_name`: Project name

## Twitter Card Configuration

- `card`: 'summary_large_image' for home pages, 'summary' for content pages
- `title`: Same as og:title
- `description`: Same as og:description
