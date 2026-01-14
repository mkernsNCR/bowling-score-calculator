# Bowling Score Calculator

An interactive web application for learning and calculating bowling scores with real-time explanations and educational features.

## Overview

This bowling score calculator is designed as an educational tool that helps users understand the complex scoring system of bowling. The application provides:

- **Interactive Scoreboard**: Visual representation of all 10 frames with proper bowling scoring logic
- **Real-time Calculations**: Instant score updates with detailed explanations
- **Educational Explanations**: Step-by-step breakdown of how strikes, spares, and open frames are scored
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, accessible interface built with React and Tailwind CSS

## Technology Stack

### Frontend
- **React 18** - UI framework with hooks and modern patterns
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Wouter** - Lightweight routing library
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form management with validation
- **TanStack Query** - Server state management
- **Framer Motion** - Animation library

### Backend
- **Express.js** - Node.js web framework
- **TypeScript** - Type-safe server-side development
- **Drizzle ORM** - Type-safe database toolkit
- **Neon Database** - PostgreSQL database hosting
- **Express Session** - Session management
- **Passport** - Authentication middleware

### Development Tools
- **Vite** - Fast development build tool
- **ESBuild** - Fast production bundler
- **PostCSS** - CSS processing
- **Drizzle Kit** - Database migration toolkit

## Project Structure

```
bowling-score-calculator/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/        # Base UI components (buttons, cards, etc.)
│   │   │   ├── examples/  # Example component implementations
│   │   │   └── *.tsx      # Bowling-specific components
│   │   ├── pages/         # Route-level components
│   │   ├── lib/           # Utility functions and configurations
│   │   └── contexts/      # React context providers
│   └── index.html         # HTML template
├── server/                # Express backend application
│   ├── app.ts            # Main Express app configuration
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Database connection and session storage
│   ├── github.ts         # GitHub integration (if applicable)
│   └── index-*.ts        # Development and production entry points
├── shared/               # Shared types and utilities
│   └── schema.ts         # Database schema definitions
├── scripts/              # Build and deployment scripts
└── design_guidelines.md  # Detailed design system documentation
```

## Key Features

### Bowling Scoring Logic
- **Strike Detection**: Automatic identification of strikes (all 10 pins in first roll)
- **Spare Calculation**: Proper scoring for spares (all 10 pins in two rolls)
- **10th Frame Rules**: Special handling for the final frame's extra rolls
- **Running Total**: Real-time cumulative score calculation

### Educational Components
- **Explanation Panel**: Detailed breakdown of scoring for each frame
- **Visual Pin Selector**: Interactive interface for entering roll results
- **Frame-by-Frame Analysis**: Step-by-step scoring explanations
- **Tutorial Hints**: Contextual help for first-time users

### User Interface
- **Responsive Scoreboard**: 10-frame grid that adapts to screen size
- **Touch-Friendly Controls**: Large tap targets for mobile devices
- **Dark/Light Theme**: Theme switching capability
- **Accessibility**: Full keyboard navigation and screen reader support

## Setup Instructions

### Prerequisites
- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **PostgreSQL database** (Neon recommended for cloud deployment)

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd bowling-score-calculator
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=postgresql://your-connection-string
NODE_ENV=development
SESSION_SECRET=your-secret-key
```

For Neon database:
1. Create a new Neon project at https://neon.tech
2. Copy the connection string
3. Add it to your `.env` file

### 3. Database Setup

Push the database schema to your PostgreSQL instance:

```bash
npm run db:push
```

This will create the necessary tables using Drizzle ORM migrations.

### 4. Development Server

Start the development server with hot reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Production Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes

## Development Workflow

### Adding New Features
1. Create components in `client/src/components/`
2. Follow the design guidelines in `design_guidelines.md`
3. Use TypeScript for type safety
4. Test on multiple screen sizes
5. Update documentation as needed

### Database Changes
1. Modify schema in `shared/schema.ts`
2. Run `npm run db:push` to apply changes
3. Update any related API endpoints

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow the spacing system (2, 4, 6, 8 units)
- Implement responsive design with mobile-first approach
- Ensure accessibility with proper ARIA labels and keyboard navigation

## Deployment

### Environment Variables
Ensure the following environment variables are set in production:
- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV=production`
- `SESSION_SECRET` - Secure random string for sessions

### Build Process
The production build process:
1. Vite builds the React frontend
2. ESBuild bundles the Express backend
3. Assets are optimized and minified
4. The application is ready for deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the existing code style and patterns
4. Test thoroughly on different devices
5. Submit a pull request with clear description

## License

MIT License - see LICENSE file for details

## Support

For questions or issues:
1. Check the `design_guidelines.md` for UI/UX guidance
2. Review the component examples in `client/src/components/examples/`
3. Ensure all environment variables are properly configured
4. Verify database connection and schema are up to date
