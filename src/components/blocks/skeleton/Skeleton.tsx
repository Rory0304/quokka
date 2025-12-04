import { cn } from "@/libs/styles/cn";
import React, { FC } from "react";
import { ClassNameValue } from "tailwind-merge";

interface SkeletonProps {
  children?: React.ReactNode;
  className?: ClassNameValue;
}

export const Skeleton: FC<SkeletonProps> = ({ className, children }) => {
  return (
    <div className={cn("flex animate-pulse space-x-4 bg-gray-200", className)}>
      {children}
    </div>
  );
};
