import { QuoteCardCategoryType } from '@/data/constants/quoteCard/QuoteCardCategory';

/**
 * 기본 정보
 */
export interface EditorConfig {
  title: string;
  category: QuoteCardCategoryType;
  tags: string[];
  isPublic: boolean;
}
