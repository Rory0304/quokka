"use client";

import React, { FC } from "react";
import { useMyQuoteCardList } from "@/hooks/quoteCard/useMyQuoteCardList";
import { MyQuoteCardListPlaceholder } from "./MyQuoteCardListPlaceholder";

import { MyQuoteCardItem } from "./MyQuoteCardItem";
import { MyQuoteCardItemLoading } from "./MyQuoteCardItemLoading";
import { Visibility } from "@/components/blocks/visibility/Visibility";

export const MyQuoteCardList: FC = () => {
  const { list, isEmpty, isFetchingNextPage, hasNextPage, onEndReached } =
    useMyQuoteCardList();

  if (isEmpty) {
    return <MyQuoteCardListPlaceholder />;
  }

  return (
    <>
      {list.map((item) => (
        <MyQuoteCardItem key={item.id} item={item} />
      ))}
      {isFetchingNextPage ? <MyQuoteCardItemLoading count={5} /> : null}
      {hasNextPage ? (
        <Visibility onChange={onEndReached} rootMargin="0px 0px 200px 0px" />
      ) : null}
    </>
  );
};
