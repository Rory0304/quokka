import React, { FC, PropsWithChildren, Suspense } from 'react';

import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { ErrorBoundary } from './ErrorBoundary';
import SSRSafeSuspense from './SSRSafeSuspense';

interface AsyncBoundaryProps {
  pendingFallback: React.ReactNode;
  errorFallback: ({ reset }: { reset: () => void }) => React.ReactNode;
}

export const AsyncBoundary: FC<PropsWithChildren<AsyncBoundaryProps>> = ({
  pendingFallback,
  errorFallback,
  children,
}) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary errorFallback={errorFallback} resetQuery={reset}>
          <SSRSafeSuspense fallback={pendingFallback}>
            {children}
          </SSRSafeSuspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
