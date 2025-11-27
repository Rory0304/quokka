import { cn } from "@/libs/styles/cn";
import React, { FC } from "react";

interface SheetTitleProps {
  title: string;
  description?: string;
}

export const SheetTitle: FC<SheetTitleProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col border-b border-gray-100 px-6 w-full py-5">
      <h3
        className={cn(
          "text-lg font-semibold text-foreground",
          typeof description === "string" ? "mb-2" : ""
        )}
      >
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
