import { useCallback, useContext } from 'react';

import { EditorHandlerContext } from '@/components/pages/editor/contexts/context';
import { AspectRatioType } from '@/data/constants/editor/AspectRatio';
import { canvasToBlob } from '@/libs/canvas/canvasToBlob';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

import { useImageUpload } from '../image/useImageUpload';

export const useEditorImageHandle = () => {
  const { quoteCardRef } = useContext(EditorHandlerContext);
  const uploadImageMutation = useImageUpload();

  const _getImageFileName = useCallback((id: string) => {
    return `${id}.jpg`;
  }, []);

  const _getImageSize = (aspectRatio: AspectRatioType) => {
    if (aspectRatio === 'square') {
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
      throw new Error('Not found matched quote card element');
    }

    const canvas = await html2canvas(elem, _getImageSize(aspectRatio));
    const blob = await canvasToBlob(canvas, 'image/jpg');

    const fileName = _getImageFileName(id);
    const file = new File([blob], fileName, {
      type: 'image/jpg',
    });
    return file;
  };

  const uploadImageFile = async ({
    aspectRatio,
    quoteCardId,
  }: {
    aspectRatio: AspectRatioType;
    quoteCardId: string;
  }): Promise<string> => {
    const id = quoteCardId;

    const file = await _createImageFile(id, aspectRatio);
    const result = await uploadImageMutation.mutateAsync({
      storage: 'CardThumbnail' as const,
      file,
    });

    return result.publicUrl;
  };

  const donwloadImage = async (name: string, aspectRatio: AspectRatioType) => {
    const file = await _createImageFile(name, aspectRatio);
    const fileName = _getImageFileName(name);

    saveAs(file, fileName);
  };

  return { uploadImageFile, donwloadImage };
};
