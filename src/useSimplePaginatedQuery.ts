import {
  PaginatedQueryArgs,
  PaginatedQueryReference,
  useQuery,
} from "convex/react";
import { Cursor, FunctionReturnType, PaginationOptions } from "convex/server";
import { useEffect, useReducer } from "react";

export const useSimplePaginatedQuery = <Query extends PaginatedQueryReference>(
  query: Query,
  args: PaginatedQueryArgs<Query> | "skip",
  options: { initialNumItems: number }
) => {
  if (options.initialNumItems <= 0) {
    throw new Error("Initial number of items must be greater than zero");
  }

  const [state, dispatch] = useReducer(reducer, {
    status: "loading",
    args,
    initialNumItems: options.initialNumItems,
    pageSize: options.initialNumItems,
  });

  const mergedArgs = argsToPaginationOpts(state);
  //@ts-expect-error
  const queryResults = useQuery(query, mergedArgs);

  useEffect(() => {
    if (queryResults) {
      dispatch({
        type: "resultsLoaded",
        results: queryResults,
        nextCursor: queryResults.isDone ? null : queryResults.continueCursor,
      });
    }
  }, [queryResults]);

  const currentPageNum = state.status === "loaded"
    ? state.prevCursors.length + 1 + (state.currentCursor ? 1 : 0)
    : 1;

  const setPageSize = (newSize: number) => {
    dispatch({ type: "setPageSize", pageSize: newSize });
  };

  return {
    ...state,
    loadNext: state.status === "loaded" && state.nextCursor
      ? () => dispatch({ type: "loadNext" })
      : null,
    loadPrev: state.status === "loaded" && (state.prevCursors.length > 0 || state.currentCursor)
      ? () => dispatch({ type: "loadPrev" })
      : null,
    currentPageNum,
    setPageSize,
  };
};

type State<Query extends PaginatedQueryReference> =
  | { status: "loading"; args: PaginatedQueryArgs<Query> | "skip"; initialNumItems: number; pageSize: number }
  | { status: "loadingNext" | "loadingPrev"; args: PaginatedQueryArgs<Query> | "skip"; initialNumItems: number; pageSize: number; loadingCursor: Cursor | null; prevCursors: Cursor[] }
  | { status: "loaded"; args: PaginatedQueryArgs<Query> | "skip"; initialNumItems: number; pageSize: number; currentResults: FunctionReturnType<Query>; currentCursor: Cursor | null; prevCursors: Cursor[]; nextCursor: Cursor | null };

type Action<Query extends PaginatedQueryReference> =
  | { type: "resultsLoaded"; results: FunctionReturnType<Query>; nextCursor: Cursor | null }
  | { type: "loadNext" }
  | { type: "loadPrev" }
  | { type: "setPageSize"; pageSize: number };

const reducer = <Query extends PaginatedQueryReference>(
  state: State<Query>,
  action: Action<Query>
): State<Query> => {
  switch (action.type) {
    case "loadPrev":
      if (state.status !== "loaded") {
        throw new Error("Cannot load previous page unless the current page is loaded");
      }
      const prevCursors = [...state.prevCursors];
      const loadingCursor = prevCursors.pop() ?? null;
      return { ...state, status: "loadingPrev", loadingCursor, prevCursors };

    case "loadNext":
      if (state.status !== "loaded") {
        throw new Error("Cannot load next page unless the current page is loaded");
      }
      return {
        ...state,
        status: "loadingNext",
        loadingCursor: state.nextCursor,
        prevCursors: [...state.prevCursors, state.currentCursor].filter(Boolean) as Cursor[],
      };

    case "resultsLoaded":
      return {
        ...state,
        status: "loaded",
        currentResults: action.results,
        currentCursor: state.status === "loadingNext" || state.status === "loadingPrev"
          ? state.loadingCursor ?? null
          : null,
        prevCursors: state.status === "loadingNext" || state.status === "loadingPrev" ? state.prevCursors : [],
        nextCursor: action.nextCursor,
      };

    case "setPageSize":
      return {
        ...state,
        pageSize: action.pageSize,
        status: "loading",
      };

    default:
      throw new Error("Invalid action type");
  }
};

const argsToPaginationOpts = <Query extends PaginatedQueryReference>(
  state: State<Query>
): PaginatedQueryArgs<Query> | "skip" => {
  if (state.args === "skip") return "skip";

  const paginationOpts: PaginationOptions = {
    numItems: state.pageSize,
    cursor: state.status === "loaded"
      ? state.currentCursor
      : state.status === "loadingNext" || state.status === "loadingPrev"
        ? state.loadingCursor ?? null
        : null,
  };

  return { ...state.args, paginationOpts };
};
