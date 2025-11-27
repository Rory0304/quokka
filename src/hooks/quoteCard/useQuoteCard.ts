import { QueryKey } from "@/data/constants/querykey/QueryKey";
import { QuoteCardType } from "@/data/interfaces/quoteCard/QuoteCardType";
import { ApiFetch } from "@/libs/api/ApiFetch";
import { skipToken, useSuspenseQuery } from "@tanstack/react-query";
import qs from "query-string";

interface QuoteCardResponse {
  data: QuoteCardType;
}

export const useQuoteCard = (id: string | null) => {
  const { data, isSuccess, isError, isLoading } = useSuspenseQuery(
    id
      ? {
          queryKey: [QueryKey.quoteCard.get_quotecrad, id],
          queryFn: async () => {
            const query = qs.stringify({ id });
            const response = await ApiFetch(`/api/quotecard?${query}`);

            if (!response.ok) {
              throw new Error(`Failed to fetch quote card: ${response.status}`);
            }

            const data = await response.json();
            return data as QuoteCardResponse;
          },
        }
      : {
          queryKey: [QueryKey.quoteCard.get_quotecrad, skipToken],
          queryFn: async () => null,
        }
  );

  return {
    quoteCard: data?.data || null,
    isSuccess,
    isError,
    isLoading,
  };
};
