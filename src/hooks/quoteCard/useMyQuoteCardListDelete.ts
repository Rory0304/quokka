import { QueryKey } from '@/data/constants/querykey/QueryKey';
import { EditorData } from '@/data/interfaces/editor';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface QuoteCardDeleteRequest {
  id: EditorData['id'];
}

export const useMyQuoteCardListDelete = () => {
  const queryClient = useQueryClient();

  const deleteQuoteCard = async (body: QuoteCardDeleteRequest) => {
    const response = await fetch('/api/quotecard', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    return response.json();
  };

  return useMutation({
    mutationFn: deleteQuoteCard,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.quoteCard.get_my_quotecard_list],
      });
    },
  });
};
