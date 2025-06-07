import {
  usePaginatedQuery,
  useQuery,
  type PaginatedQueryArgs,
  type PaginatedQueryReference,
  type UsePaginatedQueryReturnType,
} from 'convex/react'
import { useMemo, useRef } from 'react'


export const useStableQuery = ((name, ...args) => {
  const result = useQuery(name, ...args)

	// useRef() creates an object that does not change between re-renders
  // stored.current will be result (undefined) on the first render
  const stored = useRef(result) 

	// After the first render, stored.current only changes if I change it
  // if result is undefined, fresh data is loading and we should do nothing
  if (result !== undefined) {
    // if a freshly loaded result is available, use the ref to store it
    stored.current = result
  }

  // undefined on first load, stale data while reloading, fresh data after loading
  return stored.current
}) as typeof useQuery // make sure we match the useQuery signature & return type

export const useStablePaginatedQuery = ((queryFn, args, options) => {
  const result = usePaginatedQuery(queryFn, args, options)
  const { results, status, isLoading, loadMore } = result
  const stored = useRef(results) // ref objects are stable between rerenders

  // If data is still loading, wait and do nothing
  // If data has finished loading, store the results array
  if (!isLoading) {
    stored.current = result.results
  }

  return {
    results: stored.current, // empty array on first load, stale data while loading, fresh data after loading
    status,
    isLoading,
    loadMore,
  }
}) as typeof usePaginatedQuery


// I'm not sure why my original function above is modified, but it works?
// this is directly from https://stack.convex.dev/help-my-app-is-overreacting#lets-recap-this-less-reactive-app
export const useStablePaginatedQuery2 = ((name, ...args) => {
  const result = usePaginatedQuery(name, ...args)
  const stored = useRef(result)

  // If new data is still loading, wait and do nothing
  // If data has finished loading, use the ref to store it
  if (result.status !== 'LoadingMore') {
    stored.current = result
  }

  return stored.current
}) as typeof usePaginatedQuery