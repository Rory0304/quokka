import { Editor } from "@/data/interfaces/editor/Editor";
import { QuoteCardType } from "@/data/interfaces/quoteCard/QuoteCardType";
import { initalEditorState } from "../../components/pages/editor/contexts/context";
import { QuoteCardCategoryType } from "@/data/constants/quoteCard/QuoteCardCategory";

export const createEditorStateFromQuoteCard = (
  quoteCard: QuoteCardType | null
): Editor => {
  if (!quoteCard) {
    return initalEditorState;
  }

  return {
    id: quoteCard.id,
    config: {
      title: quoteCard.title,
      category: quoteCard.category as QuoteCardCategoryType,
      tags: quoteCard.tags,
      isPublic: quoteCard.isPublic,
    },
    state: {
      isDirty: false,
      selectedElement: null,
      selectedLayerId: quoteCard.customFields.data[0].id || null,
    },
    data: quoteCard.customFields.data,
  };
};
