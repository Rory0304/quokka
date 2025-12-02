"use client";

import React, { FC } from "react";
import { DownloadIcon, FileIcon, GearIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/blocks/button/Button";
import { EditorSettingDialog } from "../setting/EditorSettingDialog";
import { Dialog } from "radix-ui";
import { useEditor } from "@/hooks/editor/useEditor";
import { useEditorAction } from "@/hooks/editor/useEditorAction";

export const EditorActions: FC = () => {
  const { donwloadImage, createQuoteCard } = useEditorAction();
  const { editorState, state } = useEditor();

  const [open, setOpen] = React.useState(false);

  // {TODO} 기존 에디터 id 업데이트 필요
  const id = editorState.selectedLayerId;
  const aspectRatio = state.data[0].layout.aspectRatio;

  const handleImageDownload = () => {
    if (id) {
      donwloadImage(id, aspectRatio);
    }
  };

  const handleQuoteCardSave = () => {
    if (state.id) {
      return createQuoteCard(state);
    } else {
      return createQuoteCard(state);
    }
  };

  const renderSettingButton = () => {
    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <Button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 flex items-center gap-2"
          >
            <GearIcon color="black" width={8} height={8} />
            <span className="text-black">설정</span>
          </Button>
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
      <Button
        type="button"
        className="bg-blue-500 hover:bg-blue-600 flex items-center gap-2"
        onClick={handleQuoteCardSave}
      >
        <FileIcon color="white" width={8} height={8} />
        <span className="text-white">저장</span>
      </Button>
    );
  };

  return (
    <div className="flex items-center gap-2">
      {renderSettingButton()}
      {renderDownloadButton()}
      {renderSaveButton()}
    </div>
  );
};
