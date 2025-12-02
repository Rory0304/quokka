import { QueryKey } from "@/data/constants/querykey/QueryKey";
import { ApiFetch } from "@/libs/api/ApiFetch";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QuoteCardType } from "@/data/interfaces/quoteCard/QuoteCardType";
import qs from "query-string";
import { CursorPaginationResponse } from "@/data/interfaces/request/pagination/cursor/CursorPaginationResponse";

interface BookmarkItem {
  id: string;
  quoteCardId: string;
  createdAt: string;
  quoteCard: QuoteCardType;
}

interface BookmarkListResponse {
  data: BookmarkItem[];
  pagination: CursorPaginationResponse;
}

/**
 * 사용자의 북마크된 QuoteCard 리스트를 가져오는 hook
 */
export const useBookmarkList = ({ enabled }: { enabled: boolean }) => {
  const fetchItems = async ({ pageParam }: { pageParam: number | null }) => {
    const query = qs.stringify({
      cursor: pageParam ?? undefined,
      limit: 10,
    });

    const response = await ApiFetch(`/api/bookmark-list?${query}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch bookmark list: ${response.status}`);
    }

    const data = await response.json();
    return data as BookmarkListResponse;
  };

  const {
    data,
    isSuccess,
    isError,
    isPending,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [QueryKey.bookmark.get_bookmark_list],
    initialPageParam: null,
    queryFn: ({ pageParam }: { pageParam: number | null }) =>
      fetchItems({ pageParam }),
    getNextPageParam: (lastPage: BookmarkListResponse) =>
      lastPage.pagination.nextCursor,
    gcTime: 2 * 60 * 1000, // 2min
    enabled,
  });

  const list = data?.pages.flatMap((page) => page.data) ?? [];
  const isEmpty = isSuccess && list.length === 0;

  return {
    list,
    isSuccess,
    isError,
    isFetchingNextPage,
    isEmpty,
    isPending,
    isFetching,
    hasNextPage,
    refetch,
  };
};
