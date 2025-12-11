import React, { FC } from 'react';

import { Dialog } from 'radix-ui';

export const DialogOverlay: FC = () => {
  return (
    <Dialog.Overlay className="fixed top-0 left-0 z-10 inset-0 bg-[#000000b3] backdrop-blur-xs" />
  );
};
