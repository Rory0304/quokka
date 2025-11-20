export interface CursorPaginationRequest {
  cursor: string | null;
  limit: number;
  order?: string;
}
