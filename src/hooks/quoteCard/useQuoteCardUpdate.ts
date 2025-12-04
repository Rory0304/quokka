import { QuoteCardUpdateRequest } from "@/data/interfaces/request/quotecard/QuoteCardUpdateRequest";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useQuoteCardUpdate = () => {
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
        signal: signal,
      });

      return response.json();
    },
    onError: (error) => {
      toast.error(`Error creating todo: ${error.message}`);
    },
  });
};
