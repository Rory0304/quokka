import React, { FC } from 'react';

import { Dialog } from 'radix-ui';

export const DialogTrigger: FC = () => {
  return (
    <Dialog.Trigger asChild>
      <button className="inline-flex h-[35px] items-center justify-center rounded bg-violet4 px-[15px] font-medium leading-none text-violet11 outline-none outline-offset-1 hover:bg-mauve3 focus-visible:outline-2 focus-visible:outline-violet6 select-none">
        Edit profile
      </button>
    </Dialog.Trigger>
  );
};
