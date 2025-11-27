"use client";

import React, { FC } from "react";

import { useQuoteCardList } from "@/hooks/quoteCard/useQuoteCardList";
import { HomeQuoteCardItem } from "./HomeQuoteCardItem";

export const HomeQuoteCardList: FC = () => {
  const { list, isEmpty } = useQuoteCardList();

  if (isEmpty) {
    return <div />;
  }

  return (
    <div className="grid grid-cols-4 gap-10 group">
      {list.map((item) => (
        <HomeQuoteCardItem key={item.id} item={item} />
      ))}
    </div>
  );
};
