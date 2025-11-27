import { QuoteCardCreateRequest } from "@/data/interfaces/request/quotecard/QuoteCardCreateRequest";
import { useMutation } from "@tanstack/react-query";

export const useQuoteCardCreate = () => {
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
      console.log("Todo created successfully!");
    },
    onError: (error) => {
      console.error("Error creating todo:", error.message);
    },
  });
};
