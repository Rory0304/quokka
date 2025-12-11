import React, { FC } from 'react';

interface SheetItemContainerProps {
  children: React.ReactNode;
}

export const SheetItemContainer: FC<SheetItemContainerProps> = ({
  children,
}) => {
  return (
    <div className="flex flex-col gap-2 border-b border-gray-100 px-6 w-full py-6">
      {children}
    </div>
  );
};
