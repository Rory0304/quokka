import React, { FC } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { create } from 'zustand';

interface LoadingStore {
  isOpen: boolean;
  title?: string;
  open: (title?: string) => void;
  close: () => void;
}

export const useLoadingStore = create<LoadingStore>(set => ({
  isOpen: false,
  open: (title?: string) => set({ isOpen: true, title }),
  close: () => set({ isOpen: false }),
}));

export const GlobalLoading: FC = () => {
  const { title, isOpen } = useLoadingStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-999 flex select-none flex-col items-center justify-center gap-10 bg-slate-500 blur-2xl opacity-[0.7] animate-in"
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={{ opacity: 0.8, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(2px)' }}
        >
          {title && (
            <h1 className="pb-10 text-2xl font-bold text-white">{title}</h1>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
