"use client";

import { GlobalLayout } from "@/components/blocks/global";
import { MyQuoteCardList } from "@/components/pages/my/MyQuoteCardList";
import { QuoteCardCategoryFilter } from "@/components/pages/quoteCard/QuoteCardCategoryFilter";
import { Suspense } from "react";

export default function MyPage() {
  return (
    <GlobalLayout>
      <div>
        <QuoteCardCategoryFilter />

        <Suspense fallback={<div>Loading...</div>}>
          <MyQuoteCardList />
        </Suspense>
      </div>
    </GlobalLayout>
  );
}
