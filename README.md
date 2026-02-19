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

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Contributing

This is a private project. Contact the maintainers for contribution guidelines.
