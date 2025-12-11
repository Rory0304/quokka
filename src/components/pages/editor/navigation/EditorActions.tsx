'use client';

import React, { FC } from 'react';

import { Button } from '@/components/blocks/button/Button';
import { LoginTooltip } from '@/components/blocks/tooltip/LoginTooltip';
import { useAuth } from '@/hooks/auth';
import { useEditor } from '@/hooks/editor/useEditor';
import { useEditorCreate } from '@/hooks/editor/useEditorCreate';
import { useEditorImageHandle } from '@/hooks/editor/useEditorImageHandle';
import { useEditorUpdate } from '@/hooks/editor/useEditorUpdate';
import { DownloadIcon, FilePlusIcon, GearIcon } from '@radix-ui/react-icons';
import { Dialog } from 'radix-ui';
import { toast } from 'sonner';

import { EditorSettingDialog } from '../setting/EditorSettingDialog';
import { EditorSaveDialog } from './EditorSaveDialog';

export const EditorActions: FC = () => {
  const { createQuoteCard } = useEditorCreate();
  const { updateQuoteCard } = useEditorUpdate();
  const { donwloadImage } = useEditorImageHandle();

  const { state } = useEditor();
  const { isLogin } = useAuth();

  const [open, setOpen] = React.useState(false);

  const handleImageDownload = () => {
    const datetime = Date.now();
    const id = state.id || state.config.title || datetime.toString();
    const aspectRatio = state.data[0].layout.aspectRatio;

    if (id) {
      donwloadImage(id, aspectRatio);
    }
  };

  const handleQuoteCardSave = () => {
    if (state.id) {
      toast.promise(updateQuoteCard(state), {
        loading: '저장중...',
        success: '저장되었습니다.',
        error: '일시적인 오류가 발생되었습니다.',
        position: 'top-center',
      });
    } else {
      createQuoteCard(state);
    }
  };

  const renderSettingButton = () => {
    if (!state.id) return null;

    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <LoginTooltip>
            <Button
              type="button"
              variant="gray"
              disabled={isLogin === false}
              onClick={() => setOpen(true)}
            >
              <GearIcon color="black" width={8} height={8} />
              <span className="text-black">설정</span>
            </Button>
          </LoginTooltip>
        </Dialog.Trigger>
        <EditorSettingDialog closeDialog={() => setOpen(false)} />
      </Dialog.Root>
    );
  };

  const renderDownloadButton = () => {
    return (
      <Button
        type="button"
        className="bg-blue-500 hover:bg-blue-600 flex items-center gap-2"
        onClick={handleImageDownload}
      >
        <DownloadIcon color="white" width={8} height={8} />
        <span className="text-white">다운로드</span>
      </Button>
    );
  };

  const renderSaveButton = () => {
    return (
      <LoginTooltip>
        <Button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 flex items-center gap-2"
          onClick={handleQuoteCardSave}
          disabled={isLogin === false}
        >
          <FilePlusIcon color="white" width={8} height={8} />
          <span className="text-white">저장</span>
        </Button>
      </LoginTooltip>
    );
  };

  return (
    <div className="flex items-center gap-2">
      {renderDownloadButton()}
      {renderSaveButton()}
      {renderSettingButton()}
      <EditorSaveDialog />
    </div>
  );
};
