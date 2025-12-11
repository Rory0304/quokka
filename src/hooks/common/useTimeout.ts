import { useCallback, useEffect, useRef } from 'react';

interface TimeoutProps {
  fn: () => void;
  ms?: number;
}

export const useTimeout = ({ fn, ms = 0 }: TimeoutProps) => {
  const ready = useRef<boolean | null>(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);
  const callback = useRef(fn);

  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(() => {
    ready.current = false;
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);

  const clear = () => {
    ready.current = null;

    if (timer.current) {
      clearTimeout(timer.current);
    }
  };

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  useEffect(() => {
    set();

    return () => {
      clear();
    };
  }, [ms]);

  return {
    isReady,
    set,
    clear,
  };
};
