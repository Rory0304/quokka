'use client';

import React, { FC } from 'react';

import { Visibility } from '@/components/blocks/visibility/Visibility';
import { QuoteCardCategoryType } from '@/data/constants/quoteCard/QuoteCardCategory';
import { useQuoteCardList } from '@/hooks/quoteCard/useQuoteCardList';

import { HomeQuoteCardItem } from './HomeQuoteCardItem';
import { HomeQuoteCardItemLoading } from './HomeQuoteCardItemLoading';
import { HomeQuoteCardListPlaceholder } from './HomeQuoteCardListPlaceholder';

interface HomeQuoteCardListProps {
  category?: QuoteCardCategoryType;
  searchKey?: string;
}

export const HomeQuoteCardList: FC<HomeQuoteCardListProps> = ({
  category,
  searchKey,
}) => {
  const { list, isEmpty, hasNextPage, isFetchingNextPage, onEndReached } =
    useQuoteCardList({
      category,
      searchKey,
      limit: 10,
    });

  if (isEmpty) {
    return <HomeQuoteCardListPlaceholder searchKey={searchKey} />;
  }

  return (
    <div className="flex flex-col gap-10 pb-25">
      {list.map(item => (
        <HomeQuoteCardItem key={item.id} item={item} />
      ))}
      {isFetchingNextPage && <HomeQuoteCardItemLoading count={5} />}
      {hasNextPage ? (
        <Visibility onChange={onEndReached} rootMargin="0px 0px 200px 0px" />
      ) : null}
    </div>
  );
};
