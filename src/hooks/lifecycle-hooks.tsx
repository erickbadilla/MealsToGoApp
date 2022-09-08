import { useEffect, useRef } from "react";

/**
 * Life Cycle Hook
 * Return a boolean ref if the component is mounted or not.
 */
export const useIsMounted = (): React.MutableRefObject<boolean> => {
  const isComponentMountedRef = useRef<boolean>(false);

  useEffect(() => {
    isComponentMountedRef.current = true;

    return () => {
      isComponentMountedRef.current = false;
    };
  }, []);

  return isComponentMountedRef;
};
