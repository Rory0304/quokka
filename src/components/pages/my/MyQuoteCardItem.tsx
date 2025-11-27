import { RouteConfig } from "@/data/constants/route";
import { QuoteCardType } from "@/data/interfaces/quoteCard/QuoteCardType";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { FC } from "react";
import Image from "next/image";
import { QuoteCardCategory } from "../quoteCard/QuoteCardCategory";
import { QuoteCardTagList } from "../quoteCard/QuoteCardTagList";

interface QuoteCardItemProps {
  item: QuoteCardType;
  onClickPublicStatus: (item: QuoteCardType) => void;
}

export const MyQuoteCardItem: FC<QuoteCardItemProps> = ({
  item,
  onClickPublicStatus,
}) => {
  const url = `${RouteConfig.editor}?id=${item.id}`;

  console.log("url", url);

  return (
    <Link href={url} key={item.id}>
      <div className="w-full aspect-square mx-auto flex flex-col">
        <div className="w-full h-full aspect-square relative overflow-hidden mb-2 border border-gray-300 ">
          <button
            data-prevent-progress={true}
            className="absolute top-4 right-4 text-muted-foreground z-1 p-2 rounded-md bg-slate-200"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              onClickPublicStatus(item);
            }}
          >
            {item.isPublic ? <EyeOpenIcon /> : <EyeNoneIcon />}
          </button>
          {item.thumbnailUrl ? (
            <Image
              alt="thumbnail-image"
              src={item.thumbnailUrl}
              fill
              className="scale-100 group-hover:scale-110 duration-150"
            />
          ) : null}
        </div>
        <div>
          <QuoteCardCategory category={item.category} />
          <p className="text-foreground font-medium text-sm">{item.title}</p>
          <QuoteCardTagList tags={item.tags} />
        </div>
      </div>
    </Link>
  );
};
