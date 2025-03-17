# HSE System - Permit to Work Application

A comprehensive Health, Safety, and Environment (HSE) system for managing work permits across different roles.

## Features

- Multi-language support (English, Arabic, Hindi, Urdu)
- Role-based dashboards for different user types
- Permit workflow management
- Risk assessment
- Notification system
- Expiration handling

## Deployment Guide

### 1. Database Setup (Railway)

1. Create an account on [Railway](https://railway.app/)
2. Create a new PostgreSQL database project
3. Once created, find your database connection string in the "Connect" tab
4. Copy the connection string for the next step

### 2. Deploy to Vercel

1. Create an account on [Vercel](https://vercel.com/)
2. Install the Vercel CLI: `npm i -g vercel`
3. Run `vercel login` and follow the instructions
4. In your project directory, run `vercel`
5. When prompted, add the following environment variables:
   - `DATABASE_URL`: Paste your Railway PostgreSQL connection string
   - `NEXTAUTH_SECRET`: Generate a random string (e.g., using `openssl rand -base64 32`)
6. Complete the deployment process

### 3. Connect Your Domain (Optional)

1. In your Vercel dashboard, go to your project settings
2. Navigate to the "Domains" section
3. Add your custom domain and follow the instructions

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the required environment variables
4. Run the development server: `npm run dev`

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: Your application URL (e.g., http://localhost:3000 for local development)
- `NEXTAUTH_SECRET`: Secret key for NextAuth.js authentication

## Technical Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- PostgreSQL database

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd ptw-system
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/ptw_db"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Set up the database
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server
   ```bash
   npx next dev
   ```
   
   The application will be available at http://localhost:3000

## Project Structure

```
/app                    # Next.js App Router
  /api                  # API Routes
  /auth                 # Authentication Pages
  /components           # Reusable UI Components
  /dashboard            # Dashboard Pages for Different Roles
  /permits              # Permit Management Pages
  /types                # TypeScript Type Definitions
/prisma                 # Prisma Schema and Migrations
/public                 # Static Assets
```

## Running in Development

To run the application in development mode with hot-reload:

```bash
npx next dev -p 3000
```

## Building for Production

```bash
npm run build
npm start
```

## Troubleshooting

If you encounter issues:

1. Make sure your environment variables are correctly set
2. Ensure your database is running and accessible
3. Check that all dependencies are installed:
   ```bash
   npm install
   ```
4. Try clearing the Next.js cache:
   ```bash
   rm -rf .next
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details. 