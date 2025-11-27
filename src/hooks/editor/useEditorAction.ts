import { EditorHandlerContext } from "@/components/pages/editor/contexts/context";
import html2canvas from "html2canvas";

import { useCallback, useContext } from "react";
import { useUploadImage } from "../image/useUploadImage";
import { saveAs } from "file-saver";
import { useQuoteCardCreate } from "../quoteCard/useQuoteCardCreate";

import { Editor } from "@/data/interfaces/editor/Editor";
import { nanoid } from "nanoid";
import { QuoteCardCreateRequest } from "@/data/interfaces/request/quotecard/QuoteCardCreateRequest";

export const useEditorAction = () => {
  const uploadImageMutation = useUploadImage();
  const createQuoteCardMutation = useQuoteCardCreate();

  const { quoteCardRef } = useContext(EditorHandlerContext);

  const _getQuoteCardElement = useCallback(() => {
    return quoteCardRef?.current || null;
  }, []);

  const _getImageFileName = useCallback((id: string) => {
    return `${id}.png`;
  }, []);

  const _createImageFile = async (id: string): Promise<File> => {
    const elem = _getQuoteCardElement();

    if (elem === null) {
      new Error(`id is not exist`);
    }

    if (!elem) {
      throw new Error(`id does not exist`);
    }

    const canvas = await html2canvas(elem, { scale: 2 });
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/png")
    );

    if (!blob) {
      throw new Error("Failed to convert canvas to blob");
    }

    const fileName = _getImageFileName(id);
    const file = new File([blob], fileName, {
      type: "image/png",
    });

    return file;
  };

  const _uploadImageFile = async (): Promise<string | null> => {
    try {
      const id = nanoid();
      const file = await _createImageFile(id);
      const result = await uploadImageMutation.mutateAsync({
        storage: "CardThumbnail" as const,
        file,
      });

      return result.publicUrl;
    } catch (error) {
      console.error("Error converting div to image:", error);
      return null;
    }
  };

  const donwloadImage = async (id: string) => {
    try {
      const file = await _createImageFile(id);
      const fileName = _getImageFileName(id);
      saveAs(file, fileName);
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };

  const createQuoteCard = async (editorData: Editor) => {
    // 1. upload image first
    const thumbnailUrl = (await _uploadImageFile()) ?? undefined;
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

    // 1. create quote card first
    return createQuoteCardMutation.mutate(body);
  };

  return {
    donwloadImage,
    createQuoteCard,
  };
};
