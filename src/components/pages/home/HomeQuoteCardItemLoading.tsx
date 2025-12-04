import { Skeleton } from "@/components/blocks/skeleton/Skeleton";
import { FC } from "react";

interface HomeQuoteCardItemLoadingProps {
  count?: number;
}
export const HomeQuoteCardItemLoading: FC<HomeQuoteCardItemLoadingProps> = ({
  count = 1,
}) => {
  return Array.from({ length: count }).map((_, index: number) => (
    <Skeleton
      key={index}
      className="w-full bg-white border border-gray-100 shadow-sm flex flex-col p-4 rounded-2xl"
    >
      <Skeleton className="w-1/2 bg-gray-200 aspect-square h-4 rounded-2xl mb-6" />
      <Skeleton className="w-full bg-gray-200 aspect-square h-full rounded-2xl" />
    </Skeleton>
  ));
};
