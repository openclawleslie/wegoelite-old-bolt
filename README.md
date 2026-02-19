# WeGo Education Website

A modern, responsive educational website built with React, TypeScript, and Supabase. Features dynamic content management for courses, news, team members, and hero slides.

## Features

- **Dynamic Hero Carousel**: Rotating hero slides with customizable images, titles, and call-to-action buttons
- **Latest News**: Browse and read educational news articles with detailed views
- **Course Management**: Browse courses by theme with detailed information and time slots
- **Team Showcase**: Meet the team with individual profiles
- **Responsive Design**: Mobile-first design that works seamlessly across all devices
- **Content Management**: All content dynamically loaded from Supabase database

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Build Tool**: Vite
- **Deployment**: Ready for production deployment

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- A Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd wego-education
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run database migrations:
The project includes pre-configured migrations in `supabase/migrations/`. Apply them to your Supabase project.

### Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm preview
```

## Database Schema

The application uses the following main tables:

- **hero_slides**: Carousel slides for the homepage hero section
- **news**: News articles with images and detailed content
- **course_themes**: Course categories/themes
- **courses**: Individual courses with descriptions and pricing
- **course_time_slots**: Available time slots for each course
- **team_members**: Team profiles with photos and descriptions

All tables include Row Level Security (RLS) policies for secure data access.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── LatestNews.tsx
│   ├── CourseThemes.tsx
│   ├── TeamSection.tsx
│   ├── Footer.tsx
│   └── ...
├── pages/              # Page components
│   ├── CourseDetail.tsx
│   └── NewsDetail.tsx
├── lib/                # Utilities and configurations
│   └── supabase.ts
├── App.tsx             # Main application component
└── main.tsx            # Application entry point

public/                 # Static assets (images)
supabase/
└── migrations/         # Database migration files
```

## Key Features

### Dynamic Content Loading
All content is loaded from Supabase, making it easy to update without code changes.

### Responsive Navigation
Adaptive navigation that transforms into a mobile-friendly menu on smaller screens.

### Course Filtering
Browse courses by theme with a clean, card-based interface.

### News System
Full-featured news system with list and detail views, supporting rich content and images.

### Team Profiles
Showcase your team with professional profile cards.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Migrating Database Between Supabase Accounts

If you need to move your database from one Supabase account/project to another:

### Option 1: Using Migration Files (Recommended)

1. **Export your existing data**:
   - Go to your source Supabase project dashboard
   - Navigate to Table Editor
   - For each table, export the data as CSV or use the SQL Editor to export as SQL INSERT statements

2. **Set up the new project**:
   - Create a new Supabase project in the target account
   - Update your `.env` file with the new project credentials:
     ```
     VITE_SUPABASE_URL=your_new_supabase_url
     VITE_SUPABASE_ANON_KEY=your_new_supabase_anon_key
     ```

3. **Apply migrations**:
   - The migration files in `supabase/migrations/` contain your schema
   - In your new Supabase project, go to SQL Editor
   - Run each migration file in order (sorted by timestamp in filename)

4. **Import your data**:
   - Use the Table Editor to import CSV files, or
   - Use SQL Editor to run your INSERT statements

### Option 2: Using Supabase CLI

1. **Install Supabase CLI**:
   ```bash
   npm install -g supabase
   ```

2. **Link to source project and pull schema**:
   ```bash
   supabase login
   supabase link --project-ref your-source-project-ref
   supabase db dump -f schema.sql
   ```

3. **Export data from source**:
   ```bash
   supabase db dump --data-only -f data.sql
   ```

4. **Link to target project and push**:
   ```bash
   supabase link --project-ref your-target-project-ref
   supabase db push --include-all
   ```

5. **Import data into target**:
   ```bash
   psql -h your-target-db-host -U postgres -d postgres -f data.sql
   ```

### Option 3: Direct Database Connection

1. **Get connection strings** from both projects (Settings > Database)

2. **Use pg_dump and pg_restore**:
   ```bash
   # Dump from source
   pg_dump "source_connection_string" -Fc -f dump.backup

   # Restore to target
   pg_restore -d "target_connection_string" dump.backup
   ```

### Important Notes

- **Storage/Files**: If you have files in Supabase Storage (like images in `public/`), you'll need to download them from the source project and re-upload to the target project
- **Environment Variables**: Always update your `.env` file after switching projects
- **API Keys**: Each project has unique API keys - make sure to update them
- **Test First**: Test the migration with a small dataset before doing a full migration
- **RLS Policies**: Migration files include RLS policies, so they'll be recreated automatically

### After Migration Checklist

- [ ] Verify all tables exist in new project
- [ ] Check all data imported correctly
- [ ] Test RLS policies are working
- [ ] Upload any storage files
- [ ] Update environment variables in production deployment
- [ ] Test application functionality end-to-end

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Contributing

This is a private project. Contact the maintainers for contribution guidelines.
