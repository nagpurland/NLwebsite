# NagpurLand - Nagpur Real Estate Platform

## Overview

NagpurLand is a comprehensive real estate platform focused exclusively on Nagpur, India. The platform aggregates property listings from multiple sources (99acres, MagicBricks, Housing.com, etc.), provides data-driven insights for buyers, and includes an admin dashboard for lead management, property tracking, and campaign analytics. The core value proposition is empowering buyers with market intelligence, legal verification status, and personalized property recommendations rather than just listing aggregation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18+ with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **State Management**: TanStack React Query for server state
- **Build Tool**: Vite with custom plugins for Replit integration
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

The frontend follows a page-based structure with distinct public-facing pages (home, property search, locality guides) and admin pages (dashboard, leads, campaigns, scraping management). Components are organized into UI primitives, layout wrappers, and feature-specific modules.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints under `/api/` prefix
- **Authentication**: Session-based with token storage in PostgreSQL
- **Development**: Vite middleware integration for HMR during development

The server handles property data, lead capture, user events tracking, and admin operations. It includes a scraper infrastructure designed to aggregate listings from multiple real estate portals.

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)
- **Migrations**: Drizzle Kit with output to `./migrations`

Key tables include: users, sessions, properties, leads, localities, buyer_events, search_requirements, campaigns, scraping_sources, scraping_jobs, blog_posts, and ai_insights.

### Key Design Patterns
- **Shared Schema**: Database models defined once in `shared/` directory, consumed by both server and client
- **Storage Abstraction**: `server/storage.ts` provides a clean interface over database operations
- **Insight Engine**: `server/insights/engine.ts` calculates property scores, buyer profiles, and locality intelligence
- **Behavioral Tracking**: Frontend hooks track user interactions for lead scoring and personalization

### Build System
- **Development**: `npm run dev` starts the Express server with Vite middleware
- **Production**: `npm run build` uses esbuild for server bundling and Vite for client, outputting to `dist/`
- **Database**: `npm run db:push` syncs schema to PostgreSQL using Drizzle Kit

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries with Zod schema validation

### Third-Party Services (Configured but may need API keys)
- **Apify**: Web scraping infrastructure for aggregating property listings from real estate portals
- **Session Storage**: connect-pg-simple for PostgreSQL-backed sessions

### Frontend Libraries
- **Radix UI**: Accessible component primitives (dialogs, dropdowns, tooltips, etc.)
- **Recharts**: Data visualization for analytics dashboards
- **Embla Carousel**: Property image galleries and content carousels
- **date-fns**: Date formatting and manipulation

### Development Tools
- **Replit Plugins**: Runtime error overlay, cartographer, and dev banner for Replit environment
- **TypeScript**: Strict mode enabled with bundler module resolution