import React, { FC } from 'react';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Dialog } from 'radix-ui';

export const DialogClose: FC = () => {
  return (
    <Dialog.Close asChild>
      <button
        className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 bg-gray3 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
        aria-label="Close"
      >
        <Cross2Icon />
      </button>
    </Dialog.Close>
  );
};
