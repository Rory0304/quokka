import { Editor } from "@/data/interfaces/editor/Editor";
import { useEditorImageHandle } from "./useEditorImageHandle";
import { useQuoteCardUpdate } from "../quoteCard/useQuoteCardUpdate";
import { useState } from "react";

export const useEditorUpdate = () => {
  const { uploadImageFile } = useEditorImageHandle();
  const updateMutation = useQuoteCardUpdate();
  const [isLoading, setIsLoading] = useState(false);

  const updateQuoteCard = async (editor: Editor) => {
    if (!editor.id) return;

    try {
      setIsLoading(true);

      const thumbnailUrl = await uploadImageFile({
        aspectRatio: editor.data[0].layout.aspectRatio,
        quoteCardId: editor.id,
      });

      await updateMutation.mutateAsync({
        body: {
          id: editor.id,
          data: {
            title: editor.config.title,
            category: editor.config.category,
            tags: editor.config.tags,
            isPublic: editor.config.isPublic,
            customFields: {
              data: editor.data,
            },
            thumbnailUrl,
          },
        },
      },);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateQuoteCard,
    isLoading,
  };
};
