export const QuoteCardCategory = {
  movie: "movie",
  book: "book",
  etc: "etc",
} as const;

export type QuoteCardCategoryType = keyof typeof QuoteCardCategory;

export const QuoteCardCategoryMap: Record<QuoteCardCategoryType, string> = {
  movie: "영화",
  book: "책",
  etc: "기타",
};
