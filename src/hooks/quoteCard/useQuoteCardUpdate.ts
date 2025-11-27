import { QuoteCardUpdateRequest } from "@/data/interfaces/request/quotecard/QuoteCardUpdateRequest";
import { useMutation } from "@tanstack/react-query";

export const useQuoteCardUpdate = () => {
  return useMutation({
    mutationFn: async (body: QuoteCardUpdateRequest) => {
      const response = await fetch("/api/quotecard", {
        method: "PATCH",
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
