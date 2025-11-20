export interface CursorPaginationResponse {
  limit: number;
  nextCursor: number | null;
  hasNextPage: boolean;
}
