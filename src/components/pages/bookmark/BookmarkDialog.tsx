import { DialogOverlay } from "@/components/blocks/dialog/DialogOverlay";
import { useBookmarkList } from "@/hooks/bookmark";

import { Dialog } from "radix-ui";
import React, { FC, useEffect } from "react";
import { BookmarkItem } from "./BookmarkItem";

interface BookmarkDialogProps {
  open: boolean;
}

export const BookmarkDialog: FC<BookmarkDialogProps> = ({ open }) => {
  const { list, isPending, isError, isEmpty, refetch } = useBookmarkList({
    enabled: open,
  });

  useEffect(() => {
    if (open) {
      refetch();
    }
  }, [open]);

  return (
    <Dialog.Portal>
      <DialogOverlay />
      <Dialog.Content className="fixed z-11 shadow-md left-1/2  top-1/2 mt-10 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] focus:outline-none data-[state=open]:animate-contentShow">
        <Dialog.Title className="mb-4 text-[17px] font-medium text-foreground">
          내가 북마크한 인용 카드
        </Dialog.Title>

        <div className="fbg-white border border-gray-100 bg-white rounded-xl p-4">
          {isPending ? (
            <div className="flex flex-col justify-center gap-1 py-4 items-center mb-4">
              <p className="text-muted-foreground text-sm">로딩 중...</p>
            </div>
          ) : isError ? (
            <div className="flex flex-col justify-center gap-1 py-4 items-center mb-4">
              <p className="text-muted-foreground text-sm text-center">
                북마크를 불러오는 중 오류가 발생했습니다
              </p>
            </div>
          ) : isEmpty ? (
            <div className="flex flex-col justify-center gap-1 py-4 items-center mb-4">
              <p className="text-muted-foreground text-sm whitespace-pre-line text-center">
                {`북마크가 비어있습니다\n마음에 드는 인용구를 추가해보세요`}
              </p>
            </div>
          ) : (
            <div>
              {list.map((item) => (
                <BookmarkItem key={item.id} item={item.quoteCard} />
              ))}
            </div>
          )}
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
