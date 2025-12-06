import { QueryKey } from "@/data/constants/querykey/QueryKey";
import { EditorData } from "@/data/interfaces/editor";

import { InfiniteData } from "@tanstack/react-query";

import { useOptimisticMutation } from "../common";
import { QuoteCardListResponse } from "@/data/interfaces/response/quotecard/QuoteCardListResponse";

interface QuoteCardDeleteRequest {
  id: EditorData["id"];
}

export const useMyQuoteCardListDelete = () => {
  const mutate = async (body: QuoteCardDeleteRequest) => {
    const response = await fetch("/api/quotecard", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return response.json();
  };

  return useOptimisticMutation<
    QuoteCardListResponse,
    QuoteCardDeleteRequest,
    InfiniteData<QuoteCardListResponse>
  >({
    queryKey: [QueryKey.quoteCard.get_my_quotecard_list],
    invalidates: [[QueryKey.quoteCard.get_my_quotecard_list]],
    mutationFn: mutate,
    updater: (prev, variables) => {
      if (!prev) return prev;

      const pages = prev.pages.map((page) => {
        const data = page.data;
        const pagination = page.pagination;
        const newData = data.filter((item) => item.id !== variables.id);

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
