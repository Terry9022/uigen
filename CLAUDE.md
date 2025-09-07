# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UIGen is an AI-powered React component generator built with Next.js 15. Users describe components in natural language and get generated React components with live preview capabilities.

## Common Development Commands

```bash
# Development
npm run dev                # Start dev server with Turbopack
npm run dev:daemon         # Start dev server in background

# Setup and Database
npm run setup              # Initial setup: install + prisma generate + migrate
npx prisma generate        # Generate Prisma client
npx prisma migrate dev     # Apply database migrations
npm run db:reset           # Reset database (force)

# Build and Deploy
npm run build              # Production build
npm run start              # Start production server

# Code Quality
npm run lint               # Run ESLint
npm run test               # Run tests with Vitest
```

## Architecture Overview

### Core Systems

**Virtual File System**: The app uses an in-memory virtual file system (`/src/lib/file-system.ts`) that persists to database. All file operations go through this system rather than disk I/O.

**AI Tool Integration**: Claude AI can directly manipulate the virtual file system through structured tool calls in `/src/lib/tools/`. The `str-replace.ts` and `file-manager.ts` tools enable the AI to create, edit, and manage files.

**Real-time Preview**: Monaco Editor + live JSX compilation (`/src/lib/transform/jsx-transformer.ts`) provides instant component preview.

### Key Directories

- `/src/actions/` - Next.js server actions for database operations
- `/src/app/` - Next.js App Router pages and API routes
- `/src/components/` - React components organized by feature (chat, preview, ui)
- `/src/lib/contexts/` - React contexts (FileSystemContext, ChatContext)
- `/src/lib/tools/` - AI tool implementations for file manipulation
- `/src/hooks/` - Custom React hooks (auth, etc.)

### Database Schema (Prisma + SQLite)

```prisma
User { id, email, password, projects[] }
Project { id, name, userId?, messages, data, createdAt, updatedAt }
```

Projects can be anonymous (userId = null) or tied to authenticated users. File system data is serialized as JSON in the `data` field.

## Tech Stack Specifics

- **Next.js 15** with App Router and Turbopack
- **React 19** with TypeScript
- **Tailwind CSS v4** (uses new `@import "tailwindcss"` syntax)
- **shadcn/ui** components with New York style preset
- **Vitest** for testing with jsdom environment
- **Anthropic Claude** via Vercel AI SDK (@ai-sdk/anthropic)
- **Monaco Editor** for code editing
- **Prisma ORM** with SQLite database

## Development Notes

### Authentication
- Custom JWT-based auth with bcrypt hashing
- Anonymous usage supported (projects persist in session)
- Authenticated users get persistent projects

### AI Integration
- Streaming chat responses via `/src/app/api/chat/route.ts`
- Mock provider available when ANTHROPIC_API_KEY not set
- Tools can directly modify virtual file system

### File System Context
All file operations must go through FileSystemContext. The virtual file system is the single source of truth for all code/files in the app.

### Testing
- Tests use Vitest with React Testing Library
- Path aliases configured: `@/components`, `@/lib`, `@/hooks`, `@/actions`
- Test files located alongside source files with `.test.ts(x)` extension

### Preview System
Components are compiled client-side using the JSX transformer. The preview iframe runs in a sandboxed environment with Tailwind CSS and React available globally.

## Code Writing Guidelines
- Use comments sparingly. Only comment complex code.

## Database and Schema

- The database schema is defined in the @prisma/schema.prisma file. Reference it anytime you need to understand the structure of the data you store in database