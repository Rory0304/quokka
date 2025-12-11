import { QueryKey } from '@/data/constants/querykey/QueryKey';
import { useMutation } from '@tanstack/react-query';

interface BookmarkDeleteRequest {
  quoteCardId: string;
}

export interface BookmarkDeleteResponse {
  message: string;
}

export const useBookmarkDelete = () => {
  return useMutation<BookmarkDeleteResponse, Error, BookmarkDeleteRequest>({
    mutationKey: [QueryKey.bookmark.delete_bookmark],
    mutationFn: async body => {
      const response = await fetch('/api/bookmark', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete bookmark');
      }

      return response.json();
    },
  });
};
