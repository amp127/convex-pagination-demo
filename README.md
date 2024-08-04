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
