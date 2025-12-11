import { QuoteCardType } from '../../quoteCard/QuoteCardType';
import { CursorPaginationResponse } from '../../request/pagination/cursor/CursorPaginationResponse';

// export type QuoteCardListItem = Omit<QuoteCard, "customFields"> & {
//   customFields: EditorData;
// };

export interface QuoteCardListResponse {
  data: QuoteCardType[];
  pagination: CursorPaginationResponse;
}
