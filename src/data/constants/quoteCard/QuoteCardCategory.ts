export const QuoteCardCategory = {
  movie: 'movie',
  book: 'book',
  music: 'music',
  etc: 'etc',
} as const;

export type QuoteCardCategoryType = keyof typeof QuoteCardCategory;

export const QuoteCardCategoryMap: Record<QuoteCardCategoryType, string> = {
  movie: '영화',
  book: '책',
  music: '노래',
  etc: '기타',
};
