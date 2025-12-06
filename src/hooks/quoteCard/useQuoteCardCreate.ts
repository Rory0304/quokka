import { QueryKey } from "@/data/constants/querykey/QueryKey";
import { QuoteCardCreateRequest } from "@/data/interfaces/request/quotecard/QuoteCardCreateRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useQuoteCardCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: QuoteCardCreateRequest) => {
      const response = await fetch("/api/quotecard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
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
