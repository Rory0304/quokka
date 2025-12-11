import { QuoteCardListResponse } from '@/data/interfaces/response/quotecard/QuoteCardListResponse';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useOptimisticMutation } from '../common';
import { BookmarkCreateResponse, useBookmarkCreate } from './useBookmarkCreate';
import { BookmarkDeleteResponse, useBookmarkDelete } from './useBookmarkDelete';

interface Variables {
  isBookmarked: boolean;
  quoteCardId: string;
}

interface useBookmarkToggleProps {
  queryKey: string;
  invalidateKeys?: string[];
}
export const useBookmarkToggle = ({
  queryKey,
  invalidateKeys,
}: useBookmarkToggleProps) => {
  const createMutation = useBookmarkCreate();
  const deleteMutation = useBookmarkDelete();
  const queryClient = useQueryClient();

  const onError = (error: unknown) => {
    console.log(error);
    toast.error('북마크 업데이트에 실패했습니다.');
  };

  const cachedQueryKey = queryClient
    .getQueryCache()
    .getAll()
    .map(item => item.queryKey);

  const exactQueryKey =
    cachedQueryKey.findLast(key => key[0] === queryKey) ?? [];

  const mutate = async ({
    isBookmarked,
    quoteCardId,
  }: {
    isBookmarked: boolean;
    quoteCardId: string;
  }) => {
    if (isBookmarked) {
      return await deleteMutation.mutateAsync({ quoteCardId });
    } else {
      return await createMutation.mutateAsync({ quoteCardId });
    }
  };

  return useOptimisticMutation<
    BookmarkCreateResponse | BookmarkDeleteResponse,
    Variables,
    InfiniteData<QuoteCardListResponse>
  >({
    queryKey: exactQueryKey,
    invalidates: [invalidateKeys ?? ['']],
    mutationFn: mutate,
    updater: (prev, variables) => {
      if (!prev) return prev;

      const pages = prev.pages.map(page => {
        const data = page.data;
        const pagination = page.pagination;
        const newData = data.map(item => {
          if (item.id === variables.quoteCardId) {
            return {
              ...item,
              isBookmarked: !variables.isBookmarked,
            };
          }

          return item;
        });

        return {
          data: newData,
          pagination,
        };
      });

      return {
        pageParams: prev.pageParams,
        pages: pages,
      };
    },
  });
};
