import React, { FC } from 'react';

import { useAuth } from '@/hooks/auth';

import { BasicTooltip } from './BasicTooltip';

type LoginTooltipProps = Pick<
  React.ComponentProps<typeof BasicTooltip>,
  'contentProps' | 'children' | 'delayDuration'
>;

export const LoginTooltip: FC<LoginTooltipProps> = ({
  contentProps,
  children,
}) => {
  const { isLogin } = useAuth();

  if (isLogin) return children;

  return (
    <BasicTooltip
      contentProps={{
        side: 'bottom',
        ...contentProps,
      }}
      disabled={false}
      text={'로그인 후 이용 가능합니다'}
    >
      {children}
    </BasicTooltip>
  );
};
