import React, { FC } from 'react';

interface SheetItemTitleProps {
  title: string;
}

export const SheetItemTitle: FC<SheetItemTitleProps> = ({ title }) => {
  return (
    <div className="mb-2">
      <p className="text-sm font-semibold text-foreground">{title}</p>
    </div>
  );
};
