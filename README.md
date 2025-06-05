# Convex TanStack Table - Next.js

A modern company management application built with Next.js, Convex, TanStack Table, and shadcn/ui.

## Features

- 🏢 Company management with CRUD operations
- 📊 Advanced table with pagination, search, and sorting
- 🎨 Beautiful UI with shadcn/ui components
- 🔄 Real-time data with Convex
- 📱 Responsive design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15
- **Database**: Convex
- **UI Components**: shadcn/ui
- **Table**: TanStack Table
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   ```

3. **Start the development server**:
   ```bash
   pnpm dev
   ```

4. **Start Convex (in another terminal)**:
   ```bash
   npx convex dev
   ```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── companies/         # Companies page
│   ├── dashboard/         # Dashboard page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── hooks/             # Custom hooks
│   ├── shared/            # Shared components
│   └── ui/                # shadcn/ui components
convex/
├── companies.ts           # Companies API
├── schema.ts              # Database schema
└── users.ts               # Users API
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Deployment

This project can be deployed to Vercel, Netlify, or any platform that supports Next.js.

1. Build the project: `pnpm build`
2. Deploy the `.next` folder
3. Set up environment variables in your deployment platform

# convex-tanstack-table

`convex-tanstack-table` is an extension of Convex's pagination capabilities, providing a React hook to simplify paginated data fetching and state management. It integrates seamlessly with Convex's pagination features as described in the [Convex documentation](https://docs.convex.dev/database/pagination).

## Usage

```javascript
const {
  status,
  currentResults,
  loadNext,
  loadPrev,
  currentPageNum,
  setPageSize,
  pageSize
} = useSimplePaginatedQuery(myQuery, initialArgs, { initialNumItems: 10 });
