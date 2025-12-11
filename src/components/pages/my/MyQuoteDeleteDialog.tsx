import React, { FC } from 'react';

import { DialogActionButton } from '@/components/blocks/dialog/DialogActionButton';
import { DialogClose } from '@/components/blocks/dialog/DialogClose';
import { DialogOverlay } from '@/components/blocks/dialog/DialogOverlay';
import { Dialog } from 'radix-ui';

interface MyQuoteDeleteDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const MyQuoteDeleteDialog: FC<MyQuoteDeleteDialogProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog.Portal>
      <DialogOverlay />
      <Dialog.Content className="fixed z-11 shadow-md left-1/2  top-1/2 mt-10 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] focus:outline-none data-[state=open]:animate-contentShow">
        <Dialog.Title className="mb-4 text-[17px] font-medium text-foreground">
          인용 카드를 삭제하시겠습니까?
        </Dialog.Title>
        <Dialog.Description className="mb-4 text-md text-muted-foreground">
          삭제 후 되돌릴 수 없습니다.
        </Dialog.Description>
        <DialogClose />

        <div className="flex items-center gap-2 justify-end">
          <DialogActionButton
            variant="outline"
            label="취소"
            onClick={onCancel}
          />
          <DialogActionButton label="삭제" onClick={onConfirm} />
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
