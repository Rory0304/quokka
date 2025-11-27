import React, { FC } from "react";

interface QuoteCardTagListProps {
  tags: string[];
}

export const QuoteCardTagList: FC<QuoteCardTagListProps> = ({ tags }) => {
  return (
    <div className="flex gap-2">
      {tags.map((tag) => (
        <span
          className="flex items-center justify-center bg-green-100 p-2"
          key={tag}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
