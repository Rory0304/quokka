import React, { ComponentProps, FC } from 'react';

import { Button } from '../button/Button';

interface DialogActionButtonProps extends ComponentProps<typeof Button> {
  label: string;
}

export const DialogActionButton: FC<DialogActionButtonProps> = ({
  label,
  ...props
}) => {
  return (
    <Button {...props}>
      <span>{label}</span>
    </Button>
  );
};
