import { Dialog } from "radix-ui";
import React, { FC } from "react";

export const DialogOverlay: FC = () => {
  return (
    <Dialog.Overlay className="fixed inset-0 bg-[#000000b3] data-[state=open]:animate-overlayShow" />
  );
};
