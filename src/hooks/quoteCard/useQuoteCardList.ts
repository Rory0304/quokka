import { QueryKey } from "@/data/constants/querykey/QueryKey";
import { QuoteCardListResponse } from "@/data/interfaces/response/quotecard/QuoteCardListResponse";
import { ApiFetch } from "@/libs/api/ApiFetch";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import qs from "query-string";
import { QuoteCardCategoryType } from "@/data/constants/quoteCard/QuoteCardCategory";

interface UseQuoteCardListOptions {
  category?: QuoteCardCategoryType;
  searchKey?: string;
}

export const useQuoteCardList = (options?: UseQuoteCardListOptions) => {
  const { category, searchKey } = options || {};

  const fetchItems = async ({ pageParam }: { pageParam: number | null }) => {
    const query = qs.stringify({
      cursor: pageParam ?? undefined,
      limit: 10,
      category: category ?? undefined,
      searchKey: searchKey?.trim() || undefined,
    });

    const response = await ApiFetch(`/api/quotecards?${query}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch quote cards: ${response.status}`);
    }

    const data = await response.json();
    return data as QuoteCardListResponse;
  };

  const { data, isSuccess, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: [QueryKey.quoteCard.get_quotecard_list, category, searchKey],
      initialPageParam: null,
      queryFn: ({ pageParam }: { pageParam: number | null }) =>
        fetchItems({ pageParam }),
      getNextPageParam: (lastPage: QuoteCardListResponse) =>
        lastPage.pagination.nextCursor,
    });

  const list = data?.pages.flatMap((page) => page.data) ?? [];
  const isEmpty = isSuccess && list.length === 0;

  return {
    list,
    isSuccess,
    isFetchingNextPage,
    isEmpty,
    hasNextPage,
  };
};
