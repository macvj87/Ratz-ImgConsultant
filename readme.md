# Vivid by Rathi - Style Consultant Website

## Overview

This is a full-stack web application for Vivid by Rathi, a professional image consultant and personal stylist based in Sydney, Australia. The application serves as a marketing website featuring services, testimonials, and contact functionality for potential clients seeking color analysis and style consultation services.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server code, utilizing a monorepo structure with shared type definitions.

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom color palette matching brand identity
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: In-memory storage with fallback to PostgreSQL sessions
- **API Design**: RESTful API with JSON responses

## Key Components

### Frontend Components
- **Navigation**: Smooth scrolling single-page navigation
- **Hero Section**: Main landing area with call-to-action buttons
- **About Section**: Personal introduction and professional background
- **Services Section**: Detailed service offerings with features
- **Testimonials Section**: Client reviews and social proof
- **Blog Section**: Style tips and content marketing
- **Newsletter Signup**: Email subscription functionality
- **Contact Section**: Contact form with service selection
- **Footer**: Links and social media integration

### Backend Services
- **Contact Management**: Form submission handling with validation
- **Newsletter Management**: Email subscription with duplicate prevention
- **User Management**: Basic user system (not actively used in current implementation)
- **Storage Layer**: Abstracted storage interface with in-memory fallback

## Data Flow

1. **Client Interaction**: Users interact with React components
2. **Form Submission**: Forms use React Hook Form with Zod validation
3. **API Requests**: TanStack Query manages HTTP requests to Express backend
4. **Server Processing**: Express routes handle requests with validation
5. **Database Operations**: Drizzle ORM performs type-safe database operations
6. **Response Handling**: Client receives structured JSON responses
7. **UI Updates**: React components update based on API responses

### Database Schema
- **Users**: Basic user management (id, username, password)
- **Contacts**: Contact form submissions with service preferences
- **Newsletter Subscribers**: Email addresses with subscription timestamps

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon database connectivity
- **drizzle-orm & drizzle-kit**: Type-safe ORM and migration tools
- **@tanstack/react-query**: Server state management
- **@hookform/resolvers**: Form validation integration
- **zod**: Runtime type validation and schema definition
- **wouter**: Lightweight React router

### UI & Styling
- **@radix-ui/***: Accessible UI primitive components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Tools
- **typescript**: Type safety across the stack
- **vite**: Frontend build tool and dev server
- **tsx**: TypeScript execution for backend
- **esbuild**: Production backend bundling

## Deployment Strategy

### Development Environment
- Frontend served by Vite dev server with HMR
- Backend runs with tsx for TypeScript execution
- Database migrations handled via Drizzle Kit
- Replit-specific integrations for development experience

### Production Build Process
1. Frontend assets built with Vite to `dist/public`
2. Backend TypeScript compiled with esbuild to `dist/index.js`
3. Static files served by Express in production
4. Database migrations applied via `db:push` command

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment detection (development/production)
- **REPL_ID**: Replit environment detection

The application is designed to be deployed on platforms supporting Node.js with PostgreSQL databases, with specific optimizations for Replit's development environment.