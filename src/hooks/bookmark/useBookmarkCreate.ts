import { QueryKey } from '@/data/constants/querykey/QueryKey';
import { useMutation } from '@tanstack/react-query';

interface BookmarkCreateRequest {
  quoteCardId: string;
}

export interface BookmarkCreateResponse {
  id: string;
  message: string;
}

export const useBookmarkCreate = () => {
  return useMutation<BookmarkCreateResponse, Error, BookmarkCreateRequest>({
    mutationKey: [QueryKey.bookmark.create_bookmark],
    mutationFn: async body => {
      const response = await fetch('/api/bookmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create bookmark');
      }

      return response.json();
    },
  });
};
