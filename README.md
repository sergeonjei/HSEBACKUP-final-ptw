# HSE Permit-to-Work System

A modern web application for managing Health, Safety, and Environment (HSE) permit-to-work processes.

## Features

- **Permit Management**: Create, approve, track, and manage work permits
- **Risk Assessment**: Conduct and review risk assessments
- **Multi-language Support**: Internationalization for global teams
- **Role-based Access Control**: Different permissions for different user roles
- **Notifications**: Real-time updates for permit status changes
- **Activity Logging**: Comprehensive audit trail of all actions

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Hosting**: Vercel (recommended)

## Prerequisites

- Node.js 18.x or higher
- PostgreSQL database
- npm or yarn

## Local Development

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/hse-ptw-system.git
   cd hse-ptw-system
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env
   ```
   Edit the `.env` file with your database connection string and other required variables.

4. Set up the database:
   ```
   npx prisma migrate dev
   ```

5. Seed the database with initial data:
   ```
   npm run prisma:seed
   ```
   This creates an admin user with:
   - Email: admin@example.com
   - Password: Admin@123

6. Start the development server:
   ```
   npm run dev
   ```

7. Access the application at http://localhost:3000

## Deployment Guide

### Option 1: Deploy on Vercel (Recommended)

1. **Prepare Database on Railway**:
   - Sign up at [Railway.app](https://railway.app)
   - Create a new PostgreSQL database project
   - Copy the PostgreSQL Connection URL for the next step

2. **Deploy on Vercel**:
   - Fork this repository to your GitHub account
   - Sign up at [Vercel.com](https://vercel.com)
   - Click "New Project" and import your GitHub repository
   - Configure project settings:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: npm run build
     - Install Command: npm install
     - Output Directory: .next

3. **Set Environment Variables**:
   - `DATABASE_URL`: Your Railway PostgreSQL URL
   - `NEXTAUTH_SECRET`: A secure random string for session encryption
   - `NEXTAUTH_URL`: Your Vercel deployment URL (e.g., https://your-project.vercel.app)
   - `CRON_API_KEY`: A secure API key for scheduled tasks
   - `NODE_ENV`: Set to `production`

4. **Deploy**:
   - Click "Deploy"
   - After deployment, run the database migration in the Vercel console:
     ```
     npx prisma db push
     ```
   - Seed the database:
     ```
     npm run prisma:seed
     ```

5. **Set Up Cron Job for Expired Permits**:
   - Go to Vercel console → Settings → Cron Jobs
   - Add a new cron job that runs daily at midnight:
     ```
     0 0 * * * curl -X GET https://your-project.vercel.app/api/tasks/cron -H "Authorization: Bearer your-cron-api-key"
     ```

### Option 2: Deploy on Traditional Hosting

1. Build the application:
   ```
   npm run build
   ```

2. Start the production server:
   ```
   npm start
   ```

3. Set up a reverse proxy (Nginx, Apache) to your Node.js application
   
4. Set up a cron job to check for expired permits:
   ```
   0 0 * * * curl -X GET https://your-domain.com/api/tasks/cron -H "Authorization: Bearer your-cron-api-key"
   ```

## Post-Deployment Steps

1. Log in with the default admin account:
   - Email: admin@example.com
   - Password: Admin@123

2. Create your company structure and user accounts

3. Configure system settings

4. Important: Change the default admin password immediately

## Production Best Practices

1. Set up proper monitoring (Sentry, Datadog, etc.)
2. Configure regular database backups
3. Set up HTTPS/SSL
4. Implement rate limiting for API endpoints
5. Set up proper logging
6. Perform regular security audits

## License

This project is licensed under the MIT License - see the LICENSE file for details.

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
