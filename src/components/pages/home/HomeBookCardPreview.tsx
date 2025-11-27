"use client";

import React, { FC, Suspense } from "react";

import { QuoteCardCategoryFilter } from "../quoteCard/QuoteCardCategoryFilter";
import { HomeQuoteCardList } from "./HomeQuoteCardList";
import { ErrorBoundary } from "react-error-boundary";

export const HomeBookCardPreview: FC = () => {
  return (
    <div className="px-5">
      <QuoteCardCategoryFilter />

      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<p>Error</p>}>
          <HomeQuoteCardList />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};
