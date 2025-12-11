import React, { ComponentProps, FC } from 'react';

import { Portal } from '@radix-ui/react-tooltip';

import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip';

interface TooltipProps extends React.PropsWithChildren {
  disabled?: boolean;
  text: string;
  delayDuration?: number;
  contentProps?: ComponentProps<typeof TooltipContent>;
}

export const BasicTooltip: FC<TooltipProps> = ({
  disabled,
  text,
  contentProps,
  delayDuration = 200,
  children,
}) => {
  return (
    <Tooltip
      delayDuration={delayDuration}
      open={disabled === true ? false : undefined}
    >
      <TooltipTrigger asChild>
        <span tabIndex={0}>{children}</span>
      </TooltipTrigger>

      <Portal>
        <TooltipContent {...contentProps}>{text}</TooltipContent>
      </Portal>
    </Tooltip>
  );
};
