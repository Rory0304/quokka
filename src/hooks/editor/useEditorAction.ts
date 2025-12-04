import { EditorHandlerContext } from "@/components/pages/editor/contexts/context";
import html2canvas from "html2canvas";

import { useCallback, useContext } from "react";
import { useUploadImage } from "../image/useUploadImage";
import { saveAs } from "file-saver";
import { useQuoteCardCreate } from "../quoteCard/useQuoteCardCreate";

import { Editor } from "@/data/interfaces/editor/Editor";

import { QuoteCardCreateRequest } from "@/data/interfaces/request/quotecard/QuoteCardCreateRequest";
import { canvasToBlob } from "@/libs/canvas/canvasToBlob";
import { toast } from "sonner";
import { RouteConfig } from "@/data/constants/route";
import { useRouter } from "next/navigation";
import { useQuoteCardUpdate } from "../quoteCard/useQuoteCardUpdate";
import { AspectRatioType } from "@/data/constants/editor/AspectRatio";
import { useLoadingStore } from "@/components/blocks/global/GlobalLoading";
import { delay } from "@/libs/utils/delay";
import { useEditor } from "./useEditor";

export const useEditorAction = () => {
  const router = useRouter();
  const loadingLayer = useLoadingStore();

  const uploadImageMutation = useUploadImage();
  const createMutation = useQuoteCardCreate();
  const updateMutation = useQuoteCardUpdate();

  const { dispatch } = useEditor();
  const { quoteCardRef } = useContext(EditorHandlerContext);

  const _getImageFileName = useCallback((id: string) => {
    return `${id}.jpg`;
  }, []);

  const _getImageSize = (aspectRatio: AspectRatioType) => {
    if (aspectRatio === "square") {
      return {
        windowWidth: 1200,
        windowHeight: 1200,
      };
    }

    return {
      windowWidth: 1200,
      windowHeight: 1600,
    };
  };

  const _createImageFile = async (
    id: string,
    aspectRatio: AspectRatioType
  ): Promise<File> => {
    const elem = quoteCardRef?.current;

    if (!elem) {
      throw new Error("Not found matched quote card element");
    }

    const canvas = await html2canvas(elem, _getImageSize(aspectRatio));
    const blob = await canvasToBlob(canvas, "image/jpg");

    const fileName = _getImageFileName(id);
    const file = new File([blob], fileName, {
      type: "image/jpg",
    });
    return file;
  };

  const _uploadImageFile = async ({
    aspectRatio,
    quoteCardId,
  }: {
    aspectRatio: AspectRatioType;
    quoteCardId: string;
  }): Promise<string> => {
    const id = quoteCardId;

    const file = await _createImageFile(id, aspectRatio);
    const result = await uploadImageMutation.mutateAsync({
      storage: "CardThumbnail" as const,
      file,
    });

    return result.publicUrl;
  };

  //
  //
  //
  const donwloadImage = async (id: string, aspectRatio: AspectRatioType) => {
    try {
      const file = await _createImageFile(id, aspectRatio);
      const fileName = _getImageFileName(id);

      saveAs(file, fileName);
    } catch (error) {
      console.error(error);
      toast.error("다운로드에 오류가 발생했습니다.", {});
    }
  };

  const updateQuoteCard = async (editor: Editor) => {
    if (!editor.id) return;

    loadingLayer.open("인용 카드를 업데이트하고 있어요...");
    dispatch({ type: "UPDATE_EDITOR_SAVE", payload: true });

    try {
      const thumbnailUrl = await _uploadImageFile({
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

      router.push(RouteConfig.my);
      toast.success("인용카드 업데이트가 완료되었습니다.");
    } catch (error) {
      console.error(error);
      toast.error("업로드에 오류가 발생했습니다.");
    } finally {
      loadingLayer.close();
      dispatch({ type: "UPDATE_EDITOR_SAVE", payload: false });
    }
  };

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

      const thumbnailUrl = await _uploadImageFile({
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

      toast.success("인용카드가 생성되었습니다.", {
        position: "top-center",
      });
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
    donwloadImage,
    createQuoteCard,
    updateQuoteCard,
  };
};
