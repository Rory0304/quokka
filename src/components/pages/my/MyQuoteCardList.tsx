"use client";

import React, { FC } from "react";
import { useMyQuoteCardList } from "@/hooks/quoteCard/useMyQuoteCardList";
import { MyQuoteCardListPlaceholder } from "./MyQuoteCardListPlaceholder";

import { MyQuoteCardItem } from "./MyQuoteCardItem";
import { MyQuoteCardItemLoading } from "./MyQuoteCardItemLoading";

export const MyQuoteCardList: FC = () => {
  const { list, isEmpty, isFetchingNextPage } = useMyQuoteCardList();

  if (isEmpty) {
    return <MyQuoteCardListPlaceholder />;
  }

  return (
    <>
      {list.map((item) => (
        <MyQuoteCardItem key={item.id} item={item} />
      ))}

      {isFetchingNextPage ? <MyQuoteCardItemLoading count={5} /> : null}
    </>
  );
};
