"use client";

import { GlobalLayout } from "@/components/blocks/global";
import { MyQuoteCardList } from "@/components/pages/my/MyQuoteCardList";
import { Suspense } from "react";

export default function MyPage() {
  return (
    <GlobalLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <MyQuoteCardList />
      </Suspense>
    </GlobalLayout>
  );
}
