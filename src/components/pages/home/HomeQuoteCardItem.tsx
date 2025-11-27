import { RouteConfig } from "@/data/constants/route";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { QuoteCardCategory } from "../quoteCard/QuoteCardCategory";
import { QuoteCardType } from "@/data/interfaces/quoteCard/QuoteCardType";
import { QuoteCardTagList } from "../quoteCard/QuoteCardTagList";

interface HomeQuoteCardItemProps {
  item: QuoteCardType;
}

export const HomeQuoteCardItem: FC<HomeQuoteCardItemProps> = ({ item }) => {
  return (
    <Link href={RouteConfig.editor} key={item.id}>
      <div className="w-full aspect-square mx-auto flex flex-col">
        <div className="w-full h-full aspect-square relative overflow-hidden mb-2 border border-gray-300 ">
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
