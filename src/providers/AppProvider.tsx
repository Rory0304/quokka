"use client";

import { Bar, Progress } from "@bprogress/next";
import { ProgressProvider } from "@bprogress/next/app";

import React, { FC } from "react";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <ProgressProvider
      color="#e9631a"
      height="4px"
      options={{
        template: null,
        positionUsing: "width",
      }}
    >
      {children}

      <div className="fixed top-0 z-9999 overflow-hidden">
        <Progress>
          <Bar className="absolute top-0" />
        </Progress>
      </div>
    </ProgressProvider>
  );
};
