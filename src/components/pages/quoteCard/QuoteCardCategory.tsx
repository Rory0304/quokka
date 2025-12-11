import React, { FC } from 'react';

import {
  QuoteCardCategoryMap,
  QuoteCardCategoryType,
} from '@/data/constants/quoteCard/QuoteCardCategory';

export const QuoteCardCategory: FC<{ category: string }> = ({ category }) => {
  return (
    <div className="mb-2">
      <span className="text-xs text-gray-400 font-bold">
        {QuoteCardCategoryMap[category as QuoteCardCategoryType]}
      </span>
    </div>
  );
};
