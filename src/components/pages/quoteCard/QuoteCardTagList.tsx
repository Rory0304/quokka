import React, { FC } from "react";

interface QuoteCardTagListProps {
  tags: string[];
}

export const QuoteCardTagList: FC<QuoteCardTagListProps> = ({ tags }) => {
  return (
    <div className="flex gap-2 mb-4">
      {tags.map((tag) => (
        <span
          className="flex items-center justify-center bg-gray-50 rounded-md p-2 text-xs text-muted-foreground"
          key={tag}
        >
          #{tag}
        </span>
      ))}
    </div>
  );
};
