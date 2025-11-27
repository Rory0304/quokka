import { Dialog } from "radix-ui";
import React, { FC } from "react";

interface DialogActionButtonProps {
  label: string;
}

export const DialogActionButton: FC<DialogActionButtonProps> = ({ label }) => {
  return (
    <Dialog.Close asChild>
      <button className="inline-flex h-[35px] items-center justify-center rounded bg-blue-500 px-[15px] font-medium leading-none text-white outline-none outline-offset-1 select-none">
        {label}
      </button>
    </Dialog.Close>
  );
};
