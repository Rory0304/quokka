import { QueryKey } from "@/data/constants/querykey/QueryKey";
import { EditorData } from "@/data/interfaces/editor";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface QuoteCardDeleteRequest {
  id: EditorData["id"];
}

export const useQuoteCardDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ body }: { body: QuoteCardDeleteRequest }) => {
      const response = await fetch("/api/quotecard", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.quoteCard.get_my_quotecard_list],
      });
      toast.success("인용 카드가 삭제되었습니다.");
    },
    onError: (error) => {
      toast.error(`Error deleting quotecard: ${error.message}`);
    },
  });
};
