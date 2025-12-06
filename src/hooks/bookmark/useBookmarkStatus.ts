import { QueryKey } from "@/data/constants/querykey/QueryKey";
import { useQuery } from "@tanstack/react-query";

interface BookmarkStatusResponse {
  data: {
    isBookmarked: boolean;
    bookmarkId: string | null;
  };
}

interface BookmarkListResponse {
  data: Array<{
    id: string;
    quoteCardId: string;
    createdAt: string;
  }>;
}

/**
 * 특정 QuoteCard의 북마크 상태를 확인하는 hook
 */
export const useBookmarkStatus = (quoteCardId: string | null) => {
  return useQuery<BookmarkStatusResponse, Error>({
    queryKey: [QueryKey.bookmark.get_bookmark, quoteCardId],
    queryFn: async () => {
      if (!quoteCardId) {
        throw new Error("quoteCardId is required");
      }

      const response = await fetch(`/api/bookmark?quoteCardId=${quoteCardId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch bookmark status: ${response.status}`);
      }

      return response.json();
    },
    enabled: !!quoteCardId,
    staleTime: 1000 * 60 * 5, // 5분
  });
};

/**
 * 사용자의 모든 북마크 ID를 Set으로 반환하는 hook
 * 스크롤 시 빠른 확인을 위해 사용
 */
export const useBookmarkIdSet = () => {
  return useQuery<Set<string>, Error>({
    queryKey: [QueryKey.bookmark.get_bookmark_list],
    queryFn: async () => {
      const response = await fetch("/api/bookmark");

      if (!response.ok) {
        throw new Error(`Failed to fetch bookmarks: ${response.status}`);
      }

      const data = (await response.json()) as BookmarkListResponse;
      return new Set(data.data.map((bookmark) => bookmark.quoteCardId));
    },
    staleTime: 1000 * 60 * 5, // 5분
    select: (data) => data, // Set을 그대로 반환
  });
};
