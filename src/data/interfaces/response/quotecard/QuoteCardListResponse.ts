import type { QuoteCard } from "@prisma/client";

import { CursorPaginationResponse } from "../../request/pagination/cursor/CursorPaginationResponse";

// export type QuoteCardListItem = Omit<QuoteCard, "customFields"> & {
//   customFields: EditorData;
// };

export interface QuoteCardListResponse {
  data: QuoteCard[];
  pagination: CursorPaginationResponse;
}
