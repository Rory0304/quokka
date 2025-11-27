import { CursorPaginationResponse } from "../../request/pagination/cursor/CursorPaginationResponse";
import { QuoteCardType } from "../../quoteCard/QuoteCardType";

// export type QuoteCardListItem = Omit<QuoteCard, "customFields"> & {
//   customFields: EditorData;
// };

export interface QuoteCardListResponse {
  data: QuoteCardType[];
  pagination: CursorPaginationResponse;
}
