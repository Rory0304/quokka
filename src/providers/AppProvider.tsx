"use client";

import { GlobalLoading } from "@/components/blocks/global/GlobalLoading";
import { TooltipProvider } from "@/components/blocks/tooltip/Tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React, { FC } from "react";
import { Toaster } from "sonner";
import { ProgressProvider } from "./ProgressProvider";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ProgressProvider>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
        <GlobalLoading />
      </ProgressProvider>
    </QueryClientProvider>
  );
};
