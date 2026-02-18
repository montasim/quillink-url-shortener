[//]: # 'URL SHORTER MICROSERVICE'

# <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=28&duration=1&pause=1&color=EB008B&center=true&vCenter=true&repeat=false&width=105&height=28&lines=shrnkly" alt="shrnkly" />

> **Shrnkly** is a modern, feature-rich URL management platform that combines URL shortening, text sharing, and QR code generation in one beautiful interface. Built with Next.js 16, React 19, and TypeScript.

<!-- repository summary badges start -->
<div>
    <img alt="Wakatime coding time badge" src="https://wakatime.com/badge/user/bb224c90-7cb7-4c45-953e-a9e26c1cb06c/project/018e21fa-6cc2-477a-be0c-b5e44ca67f1c.svg?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub release" src="https://img.shields.io/github/release/montasim/shrnkly?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/montasim/shrnkly?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/w/montasim/shrnkly?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/montasim/shrnkly?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub repo file count" src="https://img.shields.io/github/directory-file-count/montasim/shrnkly?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/montasim/shrnkly?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub license" src="https://img.shields.io/github/license/montasim/shrnkly?labelColor=EB008B&color=00B8B5">
</div>
<!-- repository summary badges end -->

<br/>

[//]: # 'CONTENTS'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=120&height=24&lines=CONTENTS:" alt="CONTENTS:" />

1. [Features](#-features)
2. [Tech Stack](#-tech-stack)
3. [Prerequisites](#-prerequisites)
4. [Setup](#-setup)
5. [Running the Application](#-running-the-application)
6. [Docker Support](#-docker-support)
7. [Environment Variables](#-environment-variables)
8. [Project Structure](#-project-structure)
9. [Hosting](#-hosting)
10. [API Documentation](#-api-documentation)
11. [Contributing](#-contributing)
12. [Contributors](#-contributors)
13. [License](#-license)
14. [Contact](#-contact)

<br/>

## ✨ Features

### 🔗 URL Shortener
- Create short, memorable links instantly
- Custom slug/alias support
- Real-time click analytics and traffic insights
- Geographic tracking (country, region, city)
- Device, browser, and referrer analytics
- Link expiration settings
- QR code generation for each short link
- Password protection (premium feature)

### 📝 Text Sharing
- Share code snippets, notes, and documents securely
- Syntax highlighting for 100+ programming languages
- Password protection for sensitive content
- Auto-expiration with customizable timelines
- View count limits
- Markdown support
- Private and public sharing options
- View analytics and access logs

### 📱 QR Code Generator
- Generate QR codes for URLs, text, WiFi, contacts, and more
- Real-time preview with full customization
- Multiple output formats (PNG, SVG)
- Color customization and branding options
- Error correction levels (L, M, Q, H)
- 100% client-side generation (privacy-focused)
- Works offline
- No registration required

### 🔐 Authentication & Security
- Google OAuth 2.0 integration
- Email/password authentication
- Password reset via email
- Cloudflare Turnstile protection (bot prevention)
- JWT-based session management
- Bcrypt password hashing
- Rate limiting and abuse prevention

### 📊 Dashboard
- Comprehensive link management interface
- Real-time analytics and statistics
- Traffic overview with interactive charts
- Top-performing links/shares
- Geographic distribution maps
- Recent activity logs
- Bulk operations support

### 🌍 Internationalization
Support for 9 languages:
- 🇺🇸 English
- 🇩🇪 German (Deutsch)
- 🇫🇷 French (Français)
- 🇪🇸 Spanish (Español)
- 🇨🇳 Chinese (简体中文)
- 🇵🇰 Urdu (اردو)
- 🇮🇳 Hindi (हिन्दी)
- 🇧🇩 Bengali (বাংলা)
- 🇸🇦 Arabic (العربية)

<br/>

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16.1.6 (App Router) |
| **Language** | TypeScript 5.8+ |
| **UI Library** | React 19.1.0 |
| **Styling** | Tailwind CSS 4.1+ |
| **Components** | Radix UI, shadcn/ui |
| **Animations** | Framer Motion |
| **Database** | MongoDB (via Prisma ORM) |
| **Caching** | Redis (ioredis) |
| **Authentication** | Google OAuth, JWT, bcrypt |
| **Validation** | Zod, React Hook Form |
| **HTTP Client** | Axios |
| **i18n** | next-intl |
| **Charts** | Recharts |
| **QR Codes** | qrcode |
| **Email** | Nodemailer |
| **Security** | Cloudflare Turnstile |
| **Cron Jobs** | node-cron |
| **Testing** | Jest, ts-jest |
| **Code Quality** | Prettier, ESLint, Commitlint |
| **Secrets** | Infisical |

<br/>

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** v20.x or higher
2. **PNPM** v10.x or higher
3. **MongoDB** (local or cloud instance like MongoDB Atlas)
4. **Redis** (optional, for caching)

<br/>

## 🚀 Setup

### 1. Clone the Repository

```bash
git clone https://github.com/montasim/shrnkly.git
cd shrnkly
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Configure the following environment variables:

#### Project Configuration
```env
NEXT_PUBLIC_PROJECT_NAME=Shrnkly
NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/yourprofile
NEXT_PUBLIC_GITHUB_URL=https://github.com/yourusername
```

#### Database
```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname
```

#### Authentication
```env
JWT_ACCESS_TOKEN_SECRET=your-secret-key
JWT_ACCESS_TOKEN_EXPIRATION_IN_MINUTES=60
JWT_REFRESH_TOKEN_SECRET=your-refresh-secret
JWT_REFRESH_TOKEN_EXPIRATION_IN_MINUTES=84000
```

#### Google OAuth (Optional)
```env
GOOGLE_OAUTH_GOOGLE_CLIENT_ID=your-client-id
GOOGLE_OAUTH_GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_OAUTH_GOOGLE_REDIRECT_URI=https://yourdomain.com/api/v1/auth/google/callback
```

#### Cloudflare Turnstile
```env
NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY=your-site-key
CF_TURNSTILE_SECRET_KEY=your-secret-key
```

#### Email (for password reset)
```env
MAILER_SERVICE=Gmail
MAILER_USER=your-email@gmail.com
MAILER_PASS=your-app-password
```

See [.env.example](.env.example) for the complete list of variables.

### 4. Generate Prisma Client

```bash
pnpm prisma:generate
```

### 5. Run Database Migrations

```bash
pnpm prisma migrate dev
```

<br/>

## 🏃 Running the Application

### Development Mode

```bash
pnpm dev
```

The application will start at `http://localhost:3000`

### Production Build

```bash
pnpm build
pnpm start
```

### Code Quality

```bash
# Check formatting
pnpm prettier:check

# Fix formatting
pnpm prettier:fix

# Run linter
pnpm lint

# Run tests
pnpm test
pnpm test:watch
```

<br/>

## 🐳 Docker Support

### Build and Run Development

```bash
# Build Docker Compose services
pnpm docker:build-dev

# Run services
pnpm docker:run-dev

# Stop services
pnpm docker:stop-dev

# Rebuild services
pnpm docker:rebuild-dev
```

### Docker Compose Configuration

The project includes a `docker-compose.yml` with:
- Next.js application
- MongoDB
- Redis (optional)

<br/>

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_PROJECT_NAME` | Project/brand name | Shrnkly |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact email | - |
| `NEXT_PUBLIC_LINKEDIN_URL` | LinkedIn profile URL | - |
| `NEXT_PUBLIC_GITHUB_URL` | GitHub URL | - |
| `DATABASE_URL` | MongoDB connection string | - |
| `JWT_ACCESS_TOKEN_SECRET` | JWT access token secret | - |
| `JWT_ACCESS_TOKEN_EXPIRATION_IN_MINUTES` | Access token expiry | 60 |
| `JWT_REFRESH_TOKEN_SECRET` | JWT refresh token secret | - |
| `JWT_REFRESH_TOKEN_EXPIRATION_IN_MINUTES` | Refresh token expiry | 84000 |
| `NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key | - |
| `CF_TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret | - |
| `MAILER_SERVICE` | Email service | Gmail |
| `MAILER_USER` | Email address | - |
| `MAILER_PASS` | Email password/app password | - |
| `TEXT_SHARE_MAX_CONTENT_LENGTH_KB` | Max text share size | 100 |
| `TEXT_SHARE_DEFAULT_EXPIRY_DAYS` | Default expiry days | 30 |

See [.env.example](.env.example) for all available options.

<br/>

## 📁 Project Structure

```
shrnkly/
├── app/                        # Next.js App Router
│   ├── [locale]/              # Internationalized routes
│   │   ├── (home)/           # Public pages
│   │   ├── dashboard/        # User dashboard
│   │   └── layout.tsx        # Locale layout
│   ├── api/                   # API routes
│   └── layout.tsx            # Root layout
├── components/                # React components
│   ├── dashboard/            # Dashboard components
│   ├── footer/               # Footer components
│   ├── navbar/               # Navigation components
│   ├── qr/                   # QR code components
│   └── ui/                   # UI components (shadcn)
├── configuration/             # App configuration
├── constants/                 # Constants and configs
├── context/                   # React contexts
├── i18n/                      # Internationalization
├── lib/                       # Utilities and helpers
│   ├── generated/            # Generated code (Prisma)
│   └── actions/              # Server actions
├── messages/                  # Translation files
├── prisma/                    # Prisma schema and migrations
├── public/                    # Static assets
├── schemas/                   # Zod validation schemas
├── scripts/                   # Utility scripts
├── services/                  # Business logic services
├── types/                     # TypeScript types
└── utils/                     # Utility functions
```

<br/>

## 🌐 Hosting

### Deploy to Vercel

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/montasim/shrnkly)

<details>
<summary>Vercel Setup Guide</summary>

1. Go to [vercel.com](https://vercel.com/) and sign in with GitHub
2. Fork this repository
3. In Vercel dashboard, click "Add New Project"
4. Import your forked repository
5. Configure environment variables (copy from `.env.example`)
6. Click Deploy

</details>

### Self-Hosting

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Configure environment variables
4. Build: `pnpm build`
5. Start: `pnpm start`

Or use Docker:
```bash
docker-compose up -d
```

<br/>

## 📚 API Documentation

API endpoints are available under `/api/v1/`:

### Authentication
- `POST /api/v1/auth/signup` - Create account
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/logout` - Logout
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password
- `GET /api/v1/auth/me` - Get current user

### URLs
- `POST /api/v1/urls` - Create short URL
- `GET /api/v1/urls` - List user's URLs
- `GET /api/v1/urls/:shortKey` - Get URL details
- `DELETE /api/v1/urls/:shortKey` - Delete URL
- `GET /api/v1/urls/qr-code/:shortKey` - Get QR code

### Text Shares
- `POST /api/v1/texts` - Create text share
- `GET /api/v1/texts` - List user's shares
- `GET /api/v1/texts/:shortKey` - Get share content
- `GET /api/v1/texts/:shortKey/stats` - Get share statistics
- `DELETE /api/v1/texts/:shortKey` - Delete share

See the [API documentation](docs/API.md) for detailed endpoint documentation.

<br/>

## 🤝 Contributing

Contributions are always welcome! Please read the [contribution guidelines](CONTRIBUTING.md) first.

### How to Contribute

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Workflow

- Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification
- Run tests before submitting PR: `pnpm test`
- Ensure code is formatted: `pnpm prettier:check`
- Update documentation as needed

<br/>

## 👥 Contributors

<img loading="lazy" src="https://badges.pufler.dev/contributors/montasim/shrnkly?size=50&padding=5&perRow=10&bots=true" alt="contributors" />

<br/>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<br/>

## 📬 Contact

<!-- social media links start -->
<table align="center">
    <thead align="center">
        <tr>
            <th>
                <a href="https://www.linkedin.com/in/montasim" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                    <img loading="lazy" alt="linkedin" src="https://cdn.simpleicons.org/linkedin/EB008B" width="35px">
                </a>
            </th>
            <th>
                <a href="https://github.com/montasim" target="_blank" rel="noopener noreferrer" title="GitHub">
                    <img loading="lazy" alt="github" src="https://cdn.simpleicons.org/github/EB008B" width="35px">
                </a>
            </th>
            <th>
                <a href="https://stackoverflow.com/users/20348607/montasim" target="_blank" rel="noopener noreferrer" title="Stack Overflow">
                    <img loading="lazy" alt="stackoverflow" src="https://cdn.simpleicons.org/stackoverflow/EB008B" width="35px">
                </a>
            </th>
            <th>
                <a href="https://montasim-dev.web.app/" target="_blank" rel="noopener noreferrer" title="Portfolio">
                    <img loading="lazy" alt="website" src="https://cdn.simpleicons.org/googlechrome/EB008B" width="35px">
                </a>
            </th>
            <th>
                <a href="mailto:montasimmamun@gmail.com" target="_blank" rel="noopener noreferrer" title="Email">
                    <img loading="lazy" alt="email" src="https://cdn.simpleicons.org/gmail/EB008B" width="35px">
                </a>
            </th>
            <th>
                <a href="https://www.facebook.com/montasimmamun/" target="_blank" rel="noopener noreferrer" title="Facebook">
                    <img loading="lazy" alt="facebook" src="https://cdn.simpleicons.org/facebook/EB008B" width="35px">
                </a>
            </th>
            <th>
                <a href="https://x.com/montasimmamun" target="_blank" rel="noopener noreferrer" title="X (Twitter)">
                    <img loading="lazy" alt="x" src="https://cdn.simpleicons.org/x/EB008B" width="35px">
                </a>
            </th>
        </tr>
    </thead>
</table>
<!-- social media links end -->

<br/>
<br/>

<p align="center">Made with ❤️ by <a href="https://github.com/montasim">montasim</a></p>
