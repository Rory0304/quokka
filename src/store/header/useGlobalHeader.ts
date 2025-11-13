import { ReactNode } from "react";
import { create } from "zustand";

interface GlobalHeaderState {
  variant: "default" | "navigation";
  RightSlot: ReactNode;
  setRightSlot: (slot: ReactNode) => void;
  resetRightSlot: () => void;
}

export const useGlobalHeader = create<GlobalHeaderState>((set) => ({
  variant: "default",
  RightSlot: null,
  setRightSlot: (slot) => set({ RightSlot: slot }),
  resetRightSlot: () => set({ RightSlot: null }),
}));
