import { EditorHandlerContext } from "@/components/pages/editor/contexts/context";
import html2canvas from "html2canvas";

import { useCallback, useContext } from "react";
import { useUploadImage } from "../image/useUploadImage";
import { saveAs } from "file-saver";
import { useQuoteCardCreate } from "../quoteCard/useQuoteCardCreate";

import { Editor } from "@/data/interfaces/editor/Editor";
import { nanoid } from "nanoid";
import { QuoteCardCreateRequest } from "@/data/interfaces/request/quotecard/QuoteCardCreateRequest";
import { canvasToBlob } from "@/libs/canvas/canvasToBlob";
import { toast } from "sonner";
import { RouteConfig } from "@/data/constants/route";
import { useRouter } from "next/navigation";
import { useQuoteCardUpdate } from "../quoteCard/useQuoteCardUpdate";
import { AspectRatioType } from "@/data/constants/editor/AspectRatio";

export const useEditorAction = () => {
  const router = useRouter();
  const uploadImageMutation = useUploadImage();
  const createMutation = useQuoteCardCreate();
  const updateMutation = useQuoteCardUpdate();

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

  const _uploadImageFile = async (
    aspectRatio: AspectRatioType
  ): Promise<string> => {
    const id = nanoid();

    const file = await _createImageFile(id, aspectRatio);
    const result = await uploadImageMutation.mutateAsync({
      storage: "CardThumbnail" as const,
      file,
    });

    return result.publicUrl;
  };

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
    if (editor.id) {
      // 1. 이미지를 먼저 업로드
      const thumbnailUrl = await _uploadImageFile(
        editor.data[0].layout.aspectRatio
      );

      updateMutation.mutate({
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
    }
  };

  const createQuoteCard = async (editorData: Editor) => {
    try {
      // 1. 이미지를 먼저 업로드
      const thumbnailUrl = await _uploadImageFile(
        editorData.data[0].layout.aspectRatio
      );

      // 2. public url 을 연동
      const body: QuoteCardCreateRequest = {
        title: editorData.config.title,
        category: editorData.config.category,
        tags: editorData.config.tags,
        isPublic: editorData.config.isPublic,
        customFields: {
          data: editorData.data,
        },
        thumbnailUrl,
      };

      createMutation.mutate(body, {
        onSuccess: () => {
          toast.success("초대장이 생성되었습니다.");
          router.push(RouteConfig.my);
        },
        onError: () => toast.error("업로드에 오류가 발생했습니다.", {}),
      });
    } catch (error) {
      console.error(error);
      toast.error("이미지 업로드에 실패했습니다.", {});
    }
  };

  return {
    donwloadImage,
    createQuoteCard,
    updateQuoteCard,
  };
};
