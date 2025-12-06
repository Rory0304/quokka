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

  const config = {
    title: quoteCard.title,
    category: quoteCard.category as QuoteCardCategoryType,
    tags: quoteCard.tags,
    isPublic: quoteCard.isPublic,
  };

  const data = quoteCard.customFields.data;

  return {
    id: quoteCard.id,
    config,
    state: {
      selectedElement: null,
      selectedLayerId: quoteCard.customFields.data[0].id || null,
    },
    data,
    intiailData: {
      config,
      data,
    },
  };
};
