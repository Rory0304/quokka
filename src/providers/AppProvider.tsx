"use client";

import { TooltipProvider } from "@/components/blocks/tooltip/Tooltip";
import { Bar, Progress } from "@bprogress/next";
import { ProgressProvider } from "@bprogress/next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React, { FC } from "react";
import { Toaster } from "sonner";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ProgressProvider
        color="#e9631a"
        height="4px"
        options={{
          template: null,
          positionUsing: "width",
        }}
      >
        <TooltipProvider>{children}</TooltipProvider>

        <div className="fixed top-0 z-9999 overflow-hidden">
          <Progress>
            <Bar className="absolute top-0" />
          </Progress>
        </div>

        <Toaster />
      </ProgressProvider>
    </QueryClientProvider>
  );
};
