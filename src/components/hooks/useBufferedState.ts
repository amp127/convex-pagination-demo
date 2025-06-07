import { useRef, useState } from "react";

// this is from https://github.com/jamwt/convex-buffered-state/blob/main/pages/index.tsx

export function useBufferedState<T, D>(
    upstream: T | null,
    differ: (oldVal: T | null, newVal: T) => D
  ): {
    currentVal: T | null;
    diff: D | null;
    sync: () => void;
  } {
    const [currentVal, setCurrentVal] = useState(upstream);
    const upstreamRef = useRef(upstream);
    upstreamRef.current = upstream;
    const doSync = () => {
      console.log("sync!");
      setCurrentVal(upstreamRef.current);
    };
  
    return {
      currentVal,
      diff: upstream ? differ(currentVal, upstream) : null,
      sync: doSync,
    };
  }