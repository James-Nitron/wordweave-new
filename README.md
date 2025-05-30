# Wordweave

Learning languages as you browse the web. A Chrome extension that helps you learn new languages while surfing the internet.

## Project Structure

```
wordweave/
├── apps/
│   ├── api/         # Express API server
│   └── extension/   # Chrome extension
└── packages/
    └── database/    # Shared Prisma/DB package
```

## Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- Docker (for PostgreSQL database)
- Chrome browser

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
Create a `.env.development` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/wordweave"

# API
PORT=3000

# Clerk (for the extension)
CLERK_PUBLISHABLE_KEY="your_publishable_key"
CLERK_SECRET_KEY="your_secret_key"

# Extension
NODE_ENV="development"
API_URL="http://localhost:3000"
```

3. Start the development database:
```bash
docker-compose up -d
```

4. Generate Prisma client and push schema:
```bash
pnpm db:generate
pnpm db:push
```

## Development

Start all applications in development mode:
```bash
pnpm dev
```

This will start:
- Express API on http://localhost:3000
- Chrome extension in development mode (load unpacked)

### Loading the Extension

1. Open Chrome and navigate to `chrome://extensions`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select the `apps/extension/build` directory

## Available Scripts

- `pnpm dev` - Start all applications in development mode
- `pnpm build` - Build all applications
- `pnpm lint` - Lint all applications
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:push` - Push database schema changes

## Tech Stack

- **API Server**
  - Express.js
  - TypeScript
  - Prisma ORM

- **Chrome Extension**
  - Plasmo Framework
  - React
  - Clerk Authentication
  - TypeScript

- **Database**
  - PostgreSQL
  - Prisma

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Submit a pull request

## License

[MIT License](LICENSE) 