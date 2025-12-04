import { DialogActionButton } from "@/components/blocks/dialog/DialogActionButton";
import { DialogClose } from "@/components/blocks/dialog/DialogClose";
import { DialogOverlay } from "@/components/blocks/dialog/DialogOverlay";
import { useEditorNavigationGuard } from "@/hooks/editor/useEditorNavigationGuard";

import { Dialog } from "radix-ui";
import React, { FC } from "react";

export const EditorSaveDialog: FC = () => {
  const { openSaveModal, onCancel, onDiscard } = useEditorNavigationGuard();

  return (
    <Dialog.Root open={openSaveModal}>
      <Dialog.Portal>
        <DialogOverlay />
        <Dialog.Content className="fixed z-11 shadow-md left-1/2  top-1/2 mt-10 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="text-lg font-medium mb-4 text-foreground">
            현재 페이지에서 나가시겠습니까?
          </Dialog.Title>
          <Dialog.Description className="mb-4 text-muted-foreground">
            페이지 이동 시 내용이 저장되지 않습니다.
          </Dialog.Description>

          <div className="flex items-center justify-end gap-2">
            <DialogActionButton
              label={"나가기"}
              onClick={onDiscard}
              variant="blue"
            />
            <DialogActionButton
              label={"취소"}
              onClick={onCancel}
              variant="outline"
            />
          </div>

          <DialogClose />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
