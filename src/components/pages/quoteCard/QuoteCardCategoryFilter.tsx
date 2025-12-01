import {
  PlayIcon,
  PlusIcon,
  ReaderIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import React, { FC } from "react";
import { QuoteCardCategoryType } from "@/data/constants/quoteCard/QuoteCardCategory";

interface QuoteCardCategoryFilterProps {
  selectedCategory?: QuoteCardCategoryType;
  onCategoryChange?: (category: QuoteCardCategoryType | undefined) => void;
}

export const QuoteCardCategoryFilter: FC<QuoteCardCategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const handleCategoryClick = (category: QuoteCardCategoryType) => {
    if (selectedCategory === category) {
      // 같은 카테고리를 다시 클릭하면 필터 해제
      onCategoryChange?.(undefined);
    } else {
      onCategoryChange?.(category);
    }
  };

  return (
    <div className="flex-col items-center bg-white sticky top-20 h-fit border border-gray-100 rounded-xl md:flex hidden">
      <button
        type="button"
        onClick={() => handleCategoryClick("book")}
        className={`w-full flex items-center gap-2 p-4 hover:bg-gray-100 ${
          selectedCategory === "book" ? "bg-gray-100" : ""
        }`}
      >
        <ReaderIcon />
        <span className="text-sm font-medium">책</span>
      </button>
      <button
        type="button"
        onClick={() => handleCategoryClick("movie")}
        className={`w-full flex items-center gap-2 p-4 hover:bg-gray-100 ${
          selectedCategory === "movie" ? "bg-gray-100" : ""
        }`}
      >
        <VideoIcon />
        <span className="text-sm font-medium">영화</span>
      </button>
      <button
        type="button"
        onClick={() => handleCategoryClick("music")}
        className={`w-full flex items-center gap-2 p-4 hover:bg-gray-100 ${
          selectedCategory === "music" ? "bg-gray-100" : ""
        }`}
      >
        <PlayIcon />
        <span className="text-sm font-medium">노래</span>
      </button>

      <button
        type="button"
        onClick={() => handleCategoryClick("etc")}
        className={`w-full flex items-center gap-2 p-4 hover:bg-gray-100 ${
          selectedCategory === "etc" ? "bg-gray-100" : ""
        }`}
      >
        <PlusIcon />
        <span className="text-sm font-medium">기타</span>
      </button>
    </div>
  );
};
