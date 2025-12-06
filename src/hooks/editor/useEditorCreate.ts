import { useQuoteCardCreate } from "../quoteCard/useQuoteCardCreate";

import { Editor } from "@/data/interfaces/editor/Editor";

import { QuoteCardCreateRequest } from "@/data/interfaces/request/quotecard/QuoteCardCreateRequest";

import { toast } from "sonner";
import { RouteConfig } from "@/data/constants/route";
import { useQuoteCardUpdate } from "../quoteCard/useQuoteCardUpdate";

import { useLoadingStore } from "@/components/blocks/global/GlobalLoading";
import { delay } from "@/libs/utils/delay";
import { useEditor } from "./useEditor";
import { useRouter } from "next/navigation";
import { useEditorImageHandle } from "./useEditorImageHandle";

export const useEditorCreate = () => {
  const loadingLayer = useLoadingStore();
  const { uploadImageFile } = useEditorImageHandle();

  const router = useRouter();

  const createMutation = useQuoteCardCreate();
  const updateMutation = useQuoteCardUpdate();

  const { dispatch } = useEditor();

  const createQuoteCard = async (editorData: Editor) => {
    loadingLayer.open("인용 카드를 만들고 있어요...");
    dispatch({ type: "UPDATE_EDITOR_SAVE", payload: true });

    try {
      const body: QuoteCardCreateRequest = {
        title: editorData.config.title,
        category: editorData.config.category,
        tags: editorData.config.tags,
        isPublic: editorData.config.isPublic,
        customFields: {
          data: editorData.data,
        },
      };

      const response = await createMutation.mutateAsync(body);
      const quoteCardId = response.id;

      const thumbnailUrl = await uploadImageFile({
        quoteCardId,
        aspectRatio: editorData.data[0].layout.aspectRatio,
      });

      await updateMutation.mutateAsync({
        body: {
          id: quoteCardId,
          data: { thumbnailUrl },
        },
      });

      router.push(`${RouteConfig.editor}?id=${quoteCardId}`);
      await delay(200);
    } catch (error) {
      console.error(error);
      toast.error("인용 카드 생성에 오류가 발생했습니다.", {
        position: "top-center",
      });
    } finally {
      loadingLayer.close();
      dispatch({ type: "UPDATE_EDITOR_SAVE", payload: false });
    }
  };

  return {
    createQuoteCard,
  };
};
