import { Skeleton } from "@/components/blocks/skeleton/Skeleton";
import React, { FC } from "react";

interface MyQuoteCardItemLoadingProps {
  count?: number;
}

export const MyQuoteCardItemLoading: FC<MyQuoteCardItemLoadingProps> = ({
  count = 1,
}) => {
  return Array.from({ length: count }).map((_, index: number) => (
    <Skeleton
      key={index}
      className="w-full bg-white shadow-xs mx-auto rounded-xl flex-col border overflow-hidden border-gray-200 p-4"
    >
      <div className="flex gap-4 items-start h-full">
        <Skeleton className="w-25 h-25 aspect-square rounded-2xl mb-6" />
        <div className="w-full">
          <Skeleton className="px-4 mt-2 flex flex-col w-2/3 h-6 rounded-md" />
          <Skeleton className="px-4 mt-2 flex flex-col w-1/3 h-6 rounded-md" />
        </div>
      </div>
    </Skeleton>
  ));
};
