import React, { FC, PropsWithChildren, Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

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
          <Suspense fallback={pendingFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
