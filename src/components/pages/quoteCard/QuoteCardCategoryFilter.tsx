import { PlusIcon, ReaderIcon, VideoIcon } from "@radix-ui/react-icons";
import React, { FC } from "react";

export const QuoteCardCategoryFilter: FC = () => {
  return (
    <div className="flex items-center gap-4 justify-center py-12">
      <button
        type="button"
        className="border rounded-4xl border-black px-2 py-2 min-w-14 flex items-center gap-2"
      >
        <ReaderIcon />
        <span className="text-sm font-semibold">책</span>
      </button>
      <button
        type="button"
        className="border rounded-4xl border-black px-2 py-2 min-w-14 flex items-center gap-2"
      >
        <VideoIcon />
        <span className="text-sm font-semibold">영화</span>
      </button>
      <button
        type="button"
        className="border rounded-4xl border-black px-2 py-2 min-w-14 flex items-center gap-2"
      >
        <PlusIcon />
        <span className="text-sm font-semibold">더보기</span>
      </button>
    </div>
  );
};
