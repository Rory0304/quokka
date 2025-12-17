import { FC } from 'react';

import { SmoothImageLoader } from '@/components/blocks/image/SmoothImageLoader';
import { QueryKey } from '@/data/constants/querykey/QueryKey';
import { QuoteCardType } from '@/data/interfaces/quoteCard/QuoteCardType';
import { formatRelativeTime } from '@/libs/utils/formatRelativeTime';
import { PersonIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { Avatar } from 'radix-ui';

import { QuoteCardCategory } from '../quoteCard/QuoteCardCategory';
import { HomeBookMarkButton } from './HomeBookMarkButton';

interface HomeQuoteCardItemProps {
  item: QuoteCardType;
}

export const HomeQuoteCardItem: FC<HomeQuoteCardItemProps> = ({ item }) => {
  const relativeTime = formatRelativeTime(item.createdAt);

  return (
    <div className="w-full aspect-square mx-auto flex flex-col">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Avatar.Root className="rounded-full p-2 bg-white flex items-center justify-center">
            <Avatar.Fallback className="text-gray-500">
              <PersonIcon width={16} height={16} />
            </Avatar.Fallback>
          </Avatar.Root>

          <p className="text-muted-foreground font-medium text-xs">
            {item.user?.name || 'Anonymous'}
          </p>

          <span className="text-muted-foreground font-medium text-xs before:content-['·'] before:left-[-5px] before:absolute relative">
            {relativeTime}
          </span>
        </div>
      </div>
      <div className="flex-1 border border-gray-100 shadow-sm bg-white hover:shadow-xl duration-150 rounded-2xl  p-4 flex flex-col ">
        <div className="flex justify-between items-center">
          <QuoteCardCategory category={item.category} />
          <HomeBookMarkButton
            isBookmarked={Boolean(item.isBookmarked)}
            quoteCardId={item.id}
            queryKey={QueryKey.quoteCard.get_quotecard_list}
            invalidateKeys={[QueryKey.quoteCard.get_quotecard_list]}
          />
        </div>

        <p className="text-foreground font-medium text-sm mb-4">{item.title}</p>

        <div className="flex items-center gap-1 mb-4">
          {item.tags.map(tag => (
            <span
              className="flex items-center justify-center bg-gray-50 p-2 text-xs text-muted-foreground"
              key={tag}
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="aspect-square relative overflow-hidden border rounded-2xl border-gray-300 flex-1">
          {item.thumbnailUrl ? (
            <SmoothImageLoader
              fill
              alt="thumbnail-image"
              src={item.thumbnailUrl}
              loading="lazy"
              decoding="async"
              className="scale-100 group-hover:scale-110 ease-in-out opacity-100 w-full object-cover aspect-[1] transition-all duration-500"
              quality={100}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
