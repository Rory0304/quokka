'use client';

import React, { FC, useState } from 'react';

import { ErrorAlert } from '@/components/blocks/alert/ErrorAlert';
import { AsyncBoundary } from '@/components/blocks/asyncBoundary/AsyncBoundary';
import { QuoteCardCategoryType } from '@/data/constants/quoteCard/QuoteCardCategory';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { QuoteCardCategoryFilter } from '../quoteCard/QuoteCardCategoryFilter';
import { HomeBookMarkedQuoteCardList } from './HomeBookMarkedQuoteCardList';
import { HomeQuoteCardItemLoading } from './HomeQuoteCardItemLoading';
import { HomeQuoteCardList } from './HomeQuoteCardList';

export const HomeBookCardList: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    QuoteCardCategoryType | undefined
  >(undefined);
  const [searchInput, setSearchInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();

      const value = e.currentTarget.value;

      setSearchInput(value);
    }
  };

  return (
    <div className="grid md:grid-cols-[1fr_1.5fr_1fr] gap-12 relative">
      <QuoteCardCategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="mt-4 relative">
        <div className="pb-6">
          <div className="border border-gray-300 rounded-3xl py-2 px-3 flex items-center gap-1 bg-white">
            <input
              type="text"
              onKeyDown={handleKeyDown}
              className="flex-1 outline-none text-sm"
              placeholder="작품을 검색해보세요"
            />
            <MagnifyingGlassIcon width={20} height={20} />
          </div>
        </div>

        <AsyncBoundary
          pendingFallback={
            <div className="flex flex-col gap-10 pb-25">
              <HomeQuoteCardItemLoading count={5} />
            </div>
          }
          errorFallback={({ reset }) => (
            <ErrorAlert
              title="관련 정보를 찾지 못했어요"
              description="잠시후 다시 시도해주세요"
              onReset={reset}
            />
          )}
        >
          <HomeQuoteCardList
            category={selectedCategory}
            searchKey={searchInput}
          />
        </AsyncBoundary>
      </div>

      <HomeBookMarkedQuoteCardList />
    </div>
  );
};
