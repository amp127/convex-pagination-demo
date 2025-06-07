# Convex Pagination Testing System

A comprehensive pagination testing system showcasing different approaches to implementing pagination with Convex, TanStack Table, and React. This project demonstrates multiple pagination strategies, their trade-offs, and real-world implementation patterns.

## 🎯 Project Purpose

This application serves as a **pagination testing laboratory** where you can compare and evaluate different pagination strategies side-by-side. Each implementation uses the same dataset but employs different hooks, patterns, and optimization techniques.

## ✨ Features

- 🔄 **5 Different Pagination Approaches** - Compare various strategies
- 🏢 **Company Management System** - Real-world CRUD operations for testing
- 📊 **Advanced Table Features** - Search, filtering, and sorting
- 🎨 **Beautiful UI** - Built with shadcn/ui components
- ⚡ **Real-time Data** - Powered by Convex
- 📱 **Responsive Design** - Works on all devices
- 🧪 **A/B Testing Ready** - Easy comparison between approaches

## 🔬 Pagination Approaches Tested

This project implements and compares **5 different pagination strategies**, each with unique characteristics and use cases:

### 1. 🔧 Simple Paginated Query (Custom Hook)
**Path**: `/companies/simple-paginated`  
**Hook**: `useSimplePaginatedQuery` (by @Hmza)

Advanced pagination with full control over the pagination UI and state management.

**Features:**
- ✅ Previous/Next navigation
- ✅ Dynamic page size selection
- ✅ Advanced state management
- ✅ Custom cursor handling
- ✅ Complex refresh logic
- ✅ Bidirectional navigation

**Best for**: Applications requiring fine-grained control over pagination behavior and complex UI requirements.

### 2. ⚡ Native Pagination
**Path**: `/companies/native`  
**Hook**: `usePaginatedQuery` (Built-in Convex)

Simple pagination using Convex&apos;s built-in pagination hook with minimal configuration.

**Features:**
- ✅ Load More button pattern
- ✅ Built-in loading states
- ✅ Automatic query management
- ✅ Simplified API
- ✅ Clean state handling
- ✅ Zero configuration

**Best for**: Quick implementations where simplicity is preferred over customization.

### 3. 🛡️ Stable + Native Pagination (Anti-Flicker)
**Path**: `/companies/stable-native`  
**Hook**: `useStablePaginatedQuery` (Custom Wrapper)

Enhanced native pagination that prevents UI flicker during data reloads.

**Features:**
- ✅ Prevents table flicker
- ✅ Stable data during reloads
- ✅ Load More button pattern
- ✅ Smooth user experience
- ✅ Built-in optimization
- ✅ Best of both worlds

**Best for**: Production applications where user experience consistency is critical.

### 4. 🎯 Manual Pagination
**Path**: `/companies/manual-pagination`  
**Hook**: `useQuery` with conditional execution (by chef.convex.dev)

Manual cursor management using direct `useQuery` control with conditional queries.

**Features:**
- ✅ Manual cursor state management
- ✅ Conditional query execution
- ✅ Previous/Next navigation
- ✅ Manual filter reset logic
- ✅ Direct useQuery control
- ✅ Fine-grained performance tuning

**Best for**: Applications requiring maximum control over query execution and caching behavior.

### 5. 🔄 Next/Prev Pagination (State Machine)
**Path**: `/companies/nextprev-pagination`  
**Hook**: `useNextPrevPaginatedQuery` (by @RJ)

Advanced state management with discriminated union states and reducer patterns.

**Features:**
- ✅ Discriminated union states
- ✅ Reducer-based state management
- ✅ Bidirectional navigation
- ✅ Page number tracking
- ✅ Advanced loading states
- ✅ Type-safe state transitions

**Best for**: Complex applications requiring robust state management and predictable state transitions.

## 📊 Performance Comparison

| Approach | Setup Complexity | Customization | Performance | Flicker Prevention | State Management |
|----------|-----------------|---------------|-------------|-------------------|------------------|
| Simple Paginated | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Native | ⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| Stable + Native | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Manual | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Next/Prev | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

## Tech Stack

- **Framework**: Next.js 15
- **Database**: Convex
- **UI Components**: shadcn/ui
- **Table**: TanStack Table
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 🧪 How to Test & Compare

1. **Navigate to the main testing dashboard**: Visit `/companies` to see all pagination approaches
2. **Try each implementation**: Click on any card to test the specific pagination strategy
3. **Compare performance**: Use the same search/filter criteria across different approaches
4. **Observe differences**: Pay attention to loading states, flicker behavior, and responsiveness
5. **Check network requests**: Use browser dev tools to compare query patterns

### 🎯 Testing Scenarios

- **Search Performance**: Try searching for companies across different approaches
- **Filter Behavior**: Apply industry filters and observe state management
- **Loading States**: Add/remove companies and watch loading behavior
- **Navigation Patterns**: Test previous/next vs load-more patterns
- **Memory Usage**: Monitor performance with large datasets

## 💡 Use Cases by Business Need

| Business Requirement | Recommended Approach | Why |
|----------------------|---------------------|-----|
| **Rapid Prototyping** | Native Pagination | Minimal setup, works out of the box |
| **Production Apps** | Stable + Native | Prevents flicker, great UX |
| **Admin Dashboards** | Simple Paginated | Full control, complex filtering |
| **High-Performance Apps** | Manual Pagination | Maximum optimization control |
| **Complex State Apps** | Next/Prev Pagination | Robust state management |

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
├── app/                              # Next.js app directory
│   ├── companies/                   # Pagination testing routes
│   │   ├── page.tsx                # Main testing dashboard
│   │   ├── simple-paginated/       # Custom hook approach
│   │   ├── native/                 # Built-in Convex hook
│   │   ├── stable-native/          # Anti-flicker wrapper
│   │   ├── manual-pagination/      # Direct useQuery control
│   │   └── nextprev-pagination/    # State machine approach
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Home page
├── components/
│   ├── hooks/                      # Custom pagination hooks
│   │   ├── useStableQuery.ts      # Anti-flicker wrapper
│   │   ├── useSimplePaginatedQuery.ts  # Custom pagination
│   │   └── useNextPrevPaginatedQuery.ts # State machine hook
│   ├── shared/                     # Shared components
│   └── ui/                         # shadcn/ui components
convex/
├── companies.ts                    # Companies API with pagination
├── schema.ts                       # Database schema
└── _generated/                     # Convex generated types
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🤝 Contributors & Hook Authors

This project showcases pagination hooks created by various developers in the Convex community:

- **@Hmza** - `useSimplePaginatedQuery` - Advanced custom pagination with full control
- **@RJ** - `useNextPrevPaginatedQuery` - State machine-based pagination  
- **chef.convex.dev** - Manual pagination pattern using conditional `useQuery`
- **Convex Team** - `usePaginatedQuery` - Built-in native pagination
- **Project Team** - `useStablePaginatedQuery` - Anti-flicker wrapper implementation

## 📖 Hook Usage Examples

### useSimplePaginatedQuery (Custom Hook)
```typescript
const {
  status,
  currentResults,
  loadNext,
  loadPrev,
  currentPageNum,
  setPageSize,
  pageSize
} = useSimplePaginatedQuery(myQuery, initialArgs, { initialNumItems: 10 });
```

### useStablePaginatedQuery (Anti-Flicker)
```typescript
const {
  results,
  status,
  loadMore,
  isLoading,
} = useStablePaginatedQuery(
  api.companies.listPaginatedWithSearch,
  { search, industry, order },
  { initialNumItems: 10 }
);
```

### usePaginatedQuery (Native)
```typescript
const {
  results,
  status,
  loadMore,
  isLoading,
} = usePaginatedQuery(
  api.companies.listPaginatedWithSearch,
  { search, industry, order },
  { initialNumItems: 10 }
);
```

### Manual Pagination with useQuery
```typescript
const results = useQuery(
  shouldFetch ? api.companies.listPaginated : "skip",
  shouldFetch ? { cursor, pageSize, search } : {}
);
```

## 🔍 State Management Pattern Analysis

This project demonstrates different approaches to handling state synchronization and data consistency. Understanding these patterns helps you choose the right approach for your use case.

### **`useStableQuery` vs `useBufferedState`** - Two Different State Management Philosophies

#### **`useStableQuery`** - Anti-Flicker for Convex Queries

**Purpose**: Prevents UI flicker during Convex query reloads by maintaining previous data while new data loads.

**How it works**:
```typescript
// Keeps previous data visible while new data loads
const result = useQuery(api.companies.list, { search })
const stored = useRef(result)

if (result !== undefined) {
  stored.current = result // Only update when fresh data arrives
}

return stored.current // Returns stale data during loading, fresh data when ready
```

**Use case**: You have a table that flickers empty when filters change because `useQuery` returns `undefined` while loading.

**Result**: 
- ✅ No flicker - users see previous data during reloads
- ✅ Smooth transitions 
- ✅ Better UX during loading states

#### **`useBufferedState`** - Manual State Synchronization with Diff Detection

**Purpose**: Provides manual control over when to sync state changes, with diff detection to show what changed.

**How it works**:
```typescript
// Gives you control over when to apply upstream changes
const { currentVal, diff, sync } = useBufferedState(
  upstreamData,
  (oldVal, newVal) => calculateDiff(oldVal, newVal)
)

// currentVal = your current local state
// diff = what changed between current and upstream  
// sync() = manually apply upstream changes
```

**Use case**: You want to show users what changed and let them decide when to apply updates (like a "refresh to see new data" pattern).

**Result**:
- ✅ Manual control over updates
- ✅ Diff detection shows what changed
- ✅ User-controlled synchronization

### 🎯 **When to Use Each Pattern**

| Scenario | Use `useStableQuery` | Use `useBufferedState` |
|----------|---------------------|----------------------|
| **Auto-updating tables** | ✅ Perfect - prevents flicker | ❌ Too manual |
| **Real-time data with user control** | ❌ Too automatic | ✅ Perfect - manual sync |
| **Form data vs server data** | ❌ Not designed for this | ✅ Great for showing conflicts |
| **Simple anti-flicker** | ✅ Ideal solution | ❌ Overkill |
| **"New data available" notifications** | ❌ No diff detection | ✅ Perfect with diff |

### 💡 **Practical Examples**

#### `useStableQuery` Example:
```typescript
// Before: Table flickers empty during search
const companies = useQuery(api.companies.search, { query })
// companies = undefined while loading → empty table flicker

// After: Table shows previous results during search  
const companies = useStableQuery(api.companies.search, { query })
// companies = previous results while loading → no flicker
```

#### `useBufferedState` Example:
```typescript
// Real-time data that user controls when to see
const liveData = useQuery(api.dashboard.stats)
const { currentVal: displayedStats, diff, sync } = useBufferedState(
  liveData,
  (old, new) => ({ newAlerts: new.alerts - old.alerts })
)

// Show notification: "3 new alerts available" with refresh button
// User clicks refresh → sync() applies the new data
```

### 🔄 **Pattern Summary**

- **`useStableQuery`**: Automatic anti-flicker for smooth UX - used in this project&apos;s Stable + Native Pagination
- **`useBufferedState`**: Manual state control with change detection - available but not currently implemented in the demo

Both solve different problems around data synchronization, but `useStableQuery` is focused on seamless automatic updates while `useBufferedState` gives you manual control over when changes are applied.

## 📚 Related Resources

- [Convex Pagination Documentation](https://docs.convex.dev/database/pagination)
- [TanStack Table Documentation](https://tanstack.com/table)
- [Convex React Documentation](https://docs.convex.dev/client/react)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Convex Stack: Help, My App is Overreacting](https://stack.convex.dev/help-my-app-is-overreacting) - Source of stable query pattern

## 🚀 Deployment

This is a **demonstration/testing project** designed to showcase different pagination approaches.

For deployment:

1. Build the project: `pnpm build`
2. Deploy to Vercel, Netlify, or any Next.js-compatible platform  
3. Set up environment variables in your deployment platform
4. Configure Convex deployment for production

**Note**: This project is optimized for learning and comparison rather than production use.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).