import { Editor } from '@/data/interfaces/editor/Editor';
import { toast } from 'sonner';

import { useQuoteCardUpdate } from '../quoteCard/useQuoteCardUpdate';
import { useEditorImageHandle } from './useEditorImageHandle';

export const useEditorUpdate = () => {
  const { uploadImageFile } = useEditorImageHandle();
  const updateMutation = useQuoteCardUpdate();

  const updateQuoteCard = async (editor: Editor) => {
    if (!editor.id) return;

    try {
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
      });
    } catch (error) {
      toast.error('인용 카드 업데이트에 실패했습니다. 다시 시도해주세요');
    }
  };

  return {
    updateQuoteCard,
  };
};
