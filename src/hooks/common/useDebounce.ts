import { DependencyList, useEffect } from "react";
import { useTimeout } from "./useTimeout";

interface DebounceProps {
  deps: DependencyList;
  fn: () => void;
  ms?: number;
}

export const useDebounce = ({ deps = [], ms = 0, fn }: DebounceProps) => {
  const { isReady, set, clear } = useTimeout({
    ms,
    fn,
  });

  useEffect(() => {
    set();
  }, deps);

  return [isReady, clear];
};
