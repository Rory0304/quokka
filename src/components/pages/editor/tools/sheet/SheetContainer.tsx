import React, { FC } from "react";

interface SheetContainerProps {
  children: React.ReactNode;
}

export const SheetContainer: FC<SheetContainerProps> = ({ children }) => {
  return <div>{children}</div>;
};
