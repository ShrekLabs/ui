import { useCallback, useRef } from "react";

// alternative for useCallback without dependencies
export function useFn<ARG extends Array<unknown>, RT>(handler: (...args: ARG) => RT) {
  const handlerRef = useRef<typeof handler>(handler);

  handlerRef.current = handler;

  return useCallback((...args: ARG) => {
    return handlerRef.current(...args);
  }, []);
}
