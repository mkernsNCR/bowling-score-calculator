# Bowling Score Tutor

## Overview

Bowling Score Tutor is an educational web application that teaches users how bowling scoring works through interactive gameplay. Users enter their rolls pin-by-pin, and the application provides real-time explanations of how strikes, spares, and bonus points are calculated. The app combines game tracking with pedagogical features to help beginners understand the often-confusing rules of bowling scoring.

**Primary Purpose**: Educational tool for learning bowling scoring mechanics through hands-on practice

**Target Users**: Beginners, casual bowlers, kids, and anyone wanting to understand bowling scoring

**Core Value Proposition**: Interactive, frame-by-frame explanations that demystify bowling score calculation

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool

**Routing**: Wouter (lightweight client-side routing)
- Home page: Landing and feature introduction
- Play page: Interactive bowling game interface

**State Management**: React hooks with local component state
- Game state stored in `GameState` interface tracking all 10 frames
- No global state management library - state is lifted to parent components as needed

**UI Component System**: shadcn/ui components built on Radix UI primitives
- Design system follows Material Design principles with system-based approach
- Custom theme system with light/dark mode support via Context API
- Typography: Inter for UI, JetBrains Mono for scores and numbers
- Spacing uses Tailwind's 2, 4, 6, 8 unit system exclusively

**Styling**: Tailwind CSS with custom design tokens
- CSS variables for theme colors defined in index.css
- Mobile-first responsive design with specific breakpoints (sm: 640px, md: 768px, lg: 1024px)
- Custom utility classes for elevation effects (hover-elevate, active-elevate)

**Key UI Components**:
- `Scoreboard`: 10-column grid display of all frames with running totals
- `FrameCell`: Individual frame visualization showing rolls and scores
- `PinSelector`: 4-column grid for inputting pins knocked down (0-10)
- `ExplanationPanel`: Collapsible accordion explaining scoring logic per frame
- `GameExplanation`: Overall game breakdown showing cumulative score calculation

### Backend Architecture

**Server Framework**: Express.js with TypeScript

**Development/Production Split**:
- Development: Vite dev server with HMR (Hot Module Replacement)
- Production: Static file serving of pre-built client assets
- Separate entry points (index-dev.ts, index-prod.ts) for environment-specific configuration

**API Structure**: RESTful routes prefixed with `/api`
- Routes registered through `registerRoutes` function in server/routes.ts
- Currently minimal backend - application is primarily client-side

**Request Handling**:
- JSON body parsing with raw body capture for webhook/signature verification scenarios
- Request logging with timestamp and duration tracking
- CORS and URL encoding support built-in

### Game Logic Architecture

**Core Engine**: Pure TypeScript functions in `bowling-engine.ts`
- Immutable state updates using deep cloning
- Scoring algorithm handles strikes, spares, open frames, and 10th frame special rules
- Functions: `createNewGame()`, `addRoll()`, `removeRollFromFrame()`, `getFrameExplanation()`, `getPotentialFinalScore()`

**Scoring Rules Implementation**:
- Strike: 10 + next 2 rolls
- Spare: 10 + next 1 roll
- Open frame: Sum of 2 rolls
- 10th frame: Up to 3 rolls if strike/spare earned
- Deferred scoring: Frames wait for bonus rolls before score finalization

**Data Structures**:
```typescript
Frame {
  rolls: number[]        // Pin counts for each roll
  score: number | null   // Finalized score (null if waiting for bonuses)
  isStrike: boolean
  isSpare: boolean
  isComplete: boolean
}

GameState {
  frames: Frame[10]      // Exactly 10 frames
  currentFrame: number   // 0-9 index
  currentRoll: number    // Current roll within frame
  gameComplete: boolean
  totalScore: number     // Running total
}
```

### Theme System

**Implementation**: React Context API (`ThemeContext`)
- Supports light and dark modes
- Persists preference to localStorage
- Respects system preference as default
- Theme applied via CSS class on document root

**Color System**: HSL-based color tokens with semantic naming
- Primary colors for main actions (strikes, buttons)
- Chart colors for data visualization (spare indicators)
- Muted/accent colors for UI hierarchy
- Border and elevation colors for depth perception

### Data Storage

**Current Implementation**: In-memory storage (`MemStorage` class)
- User CRUD operations defined in storage interface
- Uses Map data structure for user storage
- UUID generation for unique IDs

**Database Schema Preparation**:
- Drizzle ORM configured with PostgreSQL dialect
- Schema defined in `shared/schema.ts` with users table
- Migration setup ready (drizzle.config.ts points to migrations folder)
- Environment variable `DATABASE_URL` expected for database connection

**Note**: The application currently uses in-memory storage. Database integration is configured but not actively used. The bowling game state is client-side only and not persisted.

## External Dependencies

### UI Component Libraries
- **Radix UI**: Unstyled, accessible component primitives (accordion, dialog, dropdown, tooltip, etc.)
- **shadcn/ui**: Pre-styled component system built on Radix UI
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Type-safe variant styling for components
- **Framer Motion**: Animation library for landing page interactions

### Data Fetching & State
- **TanStack Query (React Query)**: Server state management and caching
- **React Hook Form**: Form state management
- **Zod**: Schema validation and type inference
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### Database & ORM
- **Drizzle ORM**: Type-safe ORM for SQL databases
- **drizzle-zod**: Generates Zod schemas from Drizzle tables
- **@neondatabase/serverless**: PostgreSQL driver optimized for serverless environments
- **connect-pg-simple**: PostgreSQL session store (configured but not actively used)

### Build Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: JavaScript bundler for server-side code
- **TypeScript**: Type system and compiler
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS transformation with Autoprefixer

### Development Tools
- **Wouter**: Lightweight routing library (~1.2kB)
- **nanoid**: Unique ID generation
- **date-fns**: Date manipulation utilities

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Code mapping for debugging
- **@replit/vite-plugin-dev-banner**: Development environment banner

### Fonts
- **Google Fonts**: Inter (UI text) and JetBrains Mono (scores/numbers)
- Loaded via CDN link in client/index.html