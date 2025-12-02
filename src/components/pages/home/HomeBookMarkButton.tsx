"use client";

import { LoginTooltip } from "@/components/blocks/tooltip/LoginTooltip";
import { useAuth } from "@/hooks/auth";
import { useBookmarkToggle } from "@/hooks/bookmark";

import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";

import React, { FC } from "react";

interface HomeBookMarkButtonProps {
  quoteCardId: string;
  isBookmarked: boolean;

  queryKey: string;
  invalidateKeys?: string[];
}

export const HomeBookMarkButton: FC<HomeBookMarkButtonProps> = ({
  quoteCardId,
  isBookmarked,

  queryKey,
  invalidateKeys,
}) => {
  const { isLogin } = useAuth();
  const { mutate } = useBookmarkToggle({ queryKey, invalidateKeys });

  const handleClick = () => {
    mutate({
      quoteCardId,
      isBookmarked,
    });
  };

  return (
    <LoginTooltip>
      <button
        disabled={isLogin === false}
        onClick={handleClick}
        className={`flex justify-center w-8 h-8 items-center rounded-full p-2 bg-gray-100 text-secondary box-border`}
      >
        {isBookmarked ? (
          <BookmarkFilledIcon color="#5E223E" />
        ) : (
          <BookmarkIcon color="#5E223E" />
        )}
      </button>
    </LoginTooltip>
  );
};
