import { QueryKey } from "@/data/constants/querykey/QueryKey";
import { QuoteCardUpdateRequest } from "@/data/interfaces/request/quotecard/QuoteCardUpdateRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useQuoteCardUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      body,
      signal,
    }: {
      body: QuoteCardUpdateRequest;
      signal?: AbortSignal;
    }) => {
      if (signal?.aborted) {
        return;
      }

      const response = await fetch("/api/quotecard", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal,
      });

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          QueryKey.quoteCard.get_my_quotecard_list,
          QueryKey.quoteCard.get_quotecard_list,
        ],
      });
    },
  });
};
