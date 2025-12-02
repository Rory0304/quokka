import Image from "next/image";

import React, { FC } from "react";
import { QuoteCardCategory } from "../quoteCard/QuoteCardCategory";
import { QuoteCardType } from "@/data/interfaces/quoteCard/QuoteCardType";
import { QuoteCardTagList } from "../quoteCard/QuoteCardTagList";

import { Avatar } from "radix-ui";
import { PersonIcon } from "@radix-ui/react-icons";
import { formatRelativeTime } from "@/libs/utils/formatRelativeTime";

import { QueryKey } from "@/data/constants/querykey/QueryKey";
import { Button } from "@/components/blocks/button/Button";
import { useBookmarkDelete } from "@/hooks/bookmark";
import { useQueryClient } from "@tanstack/react-query";
import { LoadingIndicator } from "@/components/blocks/loading/LoadingIndicator";

interface BookmarkItemProps {
  item: QuoteCardType;
}

export const BookmarkItem: FC<BookmarkItemProps> = ({ item }) => {
  const relativeTime = formatRelativeTime(item.createdAt);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useBookmarkDelete();

  const handleBookmarkDelete = () => {
    mutate(
      { quoteCardId: item.id },
      {
        onSettled: () => {
          queryClient.invalidateQueries({
            queryKey: [QueryKey.bookmark.get_bookmark_list],
          });

          queryClient.invalidateQueries({
            queryKey: [QueryKey.quoteCard.get_quotecard_list],
          });
        },
      }
    );
  };

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
            {item.user?.name || "Anonymous"}
          </p>

          <span className="text-muted-foreground font-medium text-xs before:content-['·'] before:left-[-5px] before:absolute relative">
            {relativeTime}
          </span>
        </div>
      </div>
      <div className="flex-1 border border-gray-100 shadow-sm bg-white duration-150 rounded-2xl  p-4 flex flex-col ">
        <div className="flex justify-between items-center">
          <QuoteCardCategory category={item.category} />
          <Button
            variant="outline"
            onClick={handleBookmarkDelete}
            disabled={isPending}
          >
            {isPending ? <LoadingIndicator /> : <p>북마크 삭제</p>}
          </Button>
        </div>

        <p className="text-foreground font-medium text-sm mb-4">{item.title}</p>
        <QuoteCardTagList tags={item.tags} />

        <div className="aspect-square relative overflow-hidden border rounded-2xl border-gray-300 flex-1">
          {item.thumbnailUrl ? (
            <Image
              fill
              alt="thumbnail-image"
              src={item.thumbnailUrl}
              className="object-contain"
              quality={80}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
