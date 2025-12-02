import { ArrowRightIcon, BookmarkIcon } from "@radix-ui/react-icons";
import React, { FC } from "react";

export const HomeBookMarkedQuoteCardList: FC = () => {
  return (
    <div className="flex-col bg-white sticky top-20 h-fit border border-gray-100 rounded-xl p-4 hidden md:flex">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookmarkIcon />
          <p className="text-sm text-foreground font-medium">북마크</p>
        </div>
        <ArrowRightIcon />
      </div>
      <div className="flex flex-col justify-center gap-1 py-4 items-center">
        <p className="text-muted-foreground text-sm whitespace-pre-line text-center">{`북마크가 비어있습니다\n마음에 드는 인용구를 추가해보세요`}</p>
      </div>
    </div>
  );
};
