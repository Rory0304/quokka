import React, { ComponentProps, FC } from 'react';
import { InView } from 'react-intersection-observer';

type InViewProps = Omit<ComponentProps<typeof InView>, 'children'>;
type VisibilityProps = InViewProps & {
  children?: React.ReactNode;
};

export const Visibility: FC<VisibilityProps> = ({ children, ...props }) => {
  return (
    <InView as="div" {...props}>
      {children}
    </InView>
  );
};
