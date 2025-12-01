import { RouteConfig } from "@/data/constants/route";
import { QuoteCardType } from "@/data/interfaces/quoteCard/QuoteCardType";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { FC } from "react";
import Image from "next/image";
import { QuoteCardCategory } from "../quoteCard/QuoteCardCategory";
import { QuoteCardTagList } from "../quoteCard/QuoteCardTagList";
import { Button } from "@/components/blocks/button/Button";
import { Switch } from "@/components/blocks/switch/Switch";
import { useQuoteCardDelete } from "@/hooks/quoteCard/useQuoteCardDelete";

interface QuoteCardItemProps {
  item: QuoteCardType;
  onClickPublicStatus: (item: QuoteCardType) => void;
}

export const MyQuoteCardItem: FC<QuoteCardItemProps> = ({
  item,
  onClickPublicStatus,
}) => {
  const url = `${RouteConfig.editor}?id=${item.id}`;

  const deleteMutation = useQuoteCardDelete();

  const handleDelete = () => {
    deleteMutation.mutate({
      body: { id: item.id },
    });
  };

  const renderImage = () => {
    return (
      <div className="rounded-2xl shadow-md overflow-hidden self-start">
        {item.thumbnailUrl ? (
          <Image
            alt="thumbnail-image"
            src={item.thumbnailUrl}
            width={100}
            height={100}
            className="scale-100 group-hover:scale-110 duration-150"
          />
        ) : null}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="pt-4 px-4 pb-5 flex flex-col">
        <p className="text-foreground font-medium text-sm">{item.title}</p>
        <QuoteCardCategory category={item.category} />
        <QuoteCardTagList tags={item.tags} />
      </div>
    );
  };

  const renderActionButtons = () => {
    return (
      <div className="flex justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2">
          <Switch id="public-hidden" checked={item.isPublic} />
          <span className="text-xs font-medium">
            {item.isPublic ? "공개" : "비공개"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="border-gray-200"
            variant="outline"
            data-prevent-progress={true}
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            <TrashIcon color="red" aria-label="delete" />
          </Button>
          <Button asChild size="sm" data-prevent-progress={true}>
            <Link href={url}>
              <div className="flex items-center gap-1">
                <Pencil1Icon />
                <span>편집</span>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white shadow-xs mx-auto rounded-xl flex-col border overflow-hidden border-gray-200 p-4">
      <div className="flex gap-4 items-start mb-4 group">
        {renderImage()}
        {renderContent()}
      </div>
      <div>{renderActionButtons()}</div>
    </div>
  );
};
