import { QueryKey } from "@/data/constants/querykey/QueryKey";
import { QuoteCardListResponse } from "@/data/interfaces/response/quotecard/QuoteCardListResponse";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import qs from "query-string";
import { QuoteCardCategoryType } from "@/data/constants/quoteCard/QuoteCardCategory";
import { useCallback } from "react";
import { SortBy } from "@/data/interfaces/sortBy/SortBy";

interface UseQuoteCardListOptions {
  category?: QuoteCardCategoryType;
  searchKey?: string;
  limit?: number;
  sort?: SortBy;
}

export const useQuoteCardList = (options?: UseQuoteCardListOptions) => {
  const { category, searchKey, limit = 10, sort = "desc" } = options || {};

  const fetchItems = async ({ pageParam }: { pageParam: number | null }) => {
    const query = qs.stringify({
      cursor: pageParam ?? undefined,
      limit,
      sort,
      category: category ?? undefined,
      searchKey: searchKey?.trim() || undefined,
    });

    const response = await fetch(`/api/quotecards?${query}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch quote cards: ${response.status}`);
    }

    const data = await response.json();
    return data as QuoteCardListResponse;
  };

  const {
    data,
    isSuccess,
    hasNextPage,
    isError,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: [
      QueryKey.quoteCard.get_quotecard_list,
      category,
      searchKey,
      sort,
    ],
    initialPageParam: null,
    queryFn: ({ pageParam }: { pageParam: number | null }) =>
      fetchItems({ pageParam }),
    getNextPageParam: (lastPage: QuoteCardListResponse) =>
      lastPage.pagination.nextCursor,
  });

  const list = data?.pages.flatMap((page) => page.data) ?? [];
  const isEmpty = isSuccess && list.length === 0;

  const onEndReached = useCallback(() => {
    if (isFetchingNextPage || !hasNextPage || isError) return;
    fetchNextPage();
  }, [isFetchingNextPage, hasNextPage, isError, fetchNextPage]);

  return {
    list,
    isSuccess,
    isFetchingNextPage,
    isEmpty,
    hasNextPage,
    fetchNextPage,
    onEndReached,
  };
};
