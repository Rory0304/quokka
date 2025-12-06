import { RouteConfig } from "@/data/constants/route";
import { QuoteCardType } from "@/data/interfaces/quoteCard/QuoteCardType";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { QuoteCardCategory } from "../quoteCard/QuoteCardCategory";
import { QuoteCardTagList } from "../quoteCard/QuoteCardTagList";
import { Button } from "@/components/blocks/button/Button";
import { Switch } from "@/components/blocks/switch/Switch";
import { useMyQuoteCardListDelete } from "@/hooks/quoteCard/useMyQuoteCardListDelete";
import { useQuoteCardUpdate } from "@/hooks/quoteCard/useQuoteCardUpdate";
import { toast } from "sonner";
import { cn } from "@/libs/styles/cn";
import { MyQuoteDeleteDialog } from "./MyQuoteDeleteDialog";
import { Dialog } from "radix-ui";

interface QuoteCardItemProps {
  item: QuoteCardType;
}

export const MyQuoteCardItem: FC<QuoteCardItemProps> = ({ item }) => {
  const url = `${RouteConfig.editor}?id=${item.id}`;

  const deleteMutation = useMyQuoteCardListDelete();
  const updateMutation = useQuoteCardUpdate();

  const [isPublic, setIsPublic] = useState(item.isPublic);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsPublic(item.isPublic);
  }, [item.isPublic]);

  const handleChangePublicStatus = (isPublic: boolean) => {
    const prevStatus = !isPublic;

    setIsPublic(isPublic);

    updateMutation.mutate(
      {
        body: {
          id: item.id,
          data: {
            isPublic,
          },
        },
      },
      {
        onError: () => {
          setIsPublic(prevStatus);
          toast.error("공개 수정에 오류가 발생했습니다. 다시 시도해주세요", {
            position: "top-center",
          });
        },
      }
    );
  };

  const handleDelete = () => {
    toast.promise(deleteMutation.mutateAsync({ id: item.id }), {
      success: "인용 카드가 삭제되었습니다",
      error: "인용 카드 삭제에 실패했습니다.",
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
      <div className="px-4 flex flex-col">
        <p className="text-foreground font-medium text-sm line-clamp-1">
          {item.title}
        </p>
        <QuoteCardCategory category={item.category} />
        <QuoteCardTagList tags={item.tags} />
      </div>
    );
  };

  const renderActionButtons = () => {
    return (
      <div className="flex justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2">
          <Switch
            id="public-hidden"
            checked={isPublic}
            onCheckedChange={handleChangePublicStatus}
          />
          <span className="text-xs font-medium">
            {isPublic ? "공개" : "비공개"}
          </span>
        </div>

        <Dialog.Root onOpenChange={setIsOpen} open={isOpen}>
          <div className="flex items-center gap-2">
            <Dialog.Trigger asChild>
              <Button
                size="sm"
                className="border-gray-200"
                variant="outline"
                data-prevent-progress={true}
              >
                <div className="flex items-center gap-1">
                  <TrashIcon color="red" aria-label="delete" />
                  <span className="text-red-500">삭제</span>
                </div>
              </Button>
            </Dialog.Trigger>
            <Button asChild size="sm" data-prevent-progress={true}>
              <Link href={url}>
                <div className="flex items-center gap-1">
                  <Pencil1Icon />
                  <span>편집</span>
                </div>
              </Link>
            </Button>
          </div>
          <MyQuoteDeleteDialog
            onConfirm={handleDelete}
            onCancel={() => setIsOpen(false)}
          />
        </Dialog.Root>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "w-full bg-white shadow-xs mx-auto rounded-xl flex-col border overflow-hidden border-gray-200 p-4",
        deleteMutation.isPending ? "opacity-50" : "bg-white"
      )}
    >
      <div className="flex gap-4 items-center mb-4 group">
        {renderImage()}
        {renderContent()}
      </div>

      {renderActionButtons()}
    </div>
  );
};
