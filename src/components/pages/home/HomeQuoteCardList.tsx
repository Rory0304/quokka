"use client";

import React, { FC } from "react";

import { useQuoteCardList } from "@/hooks/quoteCard/useQuoteCardList";
import { HomeQuoteCardItem } from "./HomeQuoteCardItem";
import { QuoteCardCategoryType } from "@/data/constants/quoteCard/QuoteCardCategory";
import { HomeQuoteCardListPlaceholder } from "./HomeQuoteCardListPlaceholder";
import { HomeQuoteCardItemLoading } from "./HomeQuoteCardItemLoading";

interface HomeQuoteCardListProps {
  category?: QuoteCardCategoryType;
  searchKey?: string;
}

export const HomeQuoteCardList: FC<HomeQuoteCardListProps> = ({
  category,
  searchKey,
}) => {
  const { list, isEmpty, isFetchingNextPage } = useQuoteCardList({
    category,
    searchKey,
    limit: 10,
  });

  if (isEmpty) {
    return <HomeQuoteCardListPlaceholder searchKey={searchKey} />;
  }

  return (
    <div className="flex flex-col gap-10 pb-25">
      {list.map((item) => (
        <HomeQuoteCardItem key={item.id} item={item} />
      ))}
      {isFetchingNextPage && <HomeQuoteCardItemLoading count={5} />}
    </div>
  );
};
