'use client';

import React, { FC } from 'react';

import { Bar, Progress } from '@bprogress/next';
import { ProgressProvider as NextProgressProvider } from '@bprogress/next/app';

interface ProgressProviderProps {
  children: React.ReactNode;
}

export const ProgressProvider: FC<ProgressProviderProps> = ({ children }) => {
  return (
    <NextProgressProvider
      color="#e9631a"
      height="4px"
      options={{
        template: null,
        positionUsing: 'width',
      }}
    >
      {children}
      <div className="fixed top-0 z-9999 overflow-hidden">
        <Progress>
          <Bar className="absolute top-0" />
        </Progress>
      </div>
    </NextProgressProvider>
  );
};
