import React, { FC } from "react";

export const QuoteCardCategory: FC<{ category: string }> = ({ category }) => {
  return (
    <div className="mb-2">
      <span className="text-xs text-muted-foreground font-light">
        {category}
      </span>
    </div>
  );
};
