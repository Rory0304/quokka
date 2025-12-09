import { Button } from "@/components/blocks/button/Button";
import { DialogClose } from "@/components/blocks/dialog/DialogClose";
import { DialogOverlay } from "@/components/blocks/dialog/DialogOverlay";

import { Switch } from "@/components/blocks/switch/Switch";
import { useEditor } from "@/hooks/editor/useEditor";
import { useQuoteCardUpdate } from "@/hooks/quoteCard/useQuoteCardUpdate";
import { Cross1Icon } from "@radix-ui/react-icons";

import { Dialog } from "radix-ui";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { CategorySelector } from "../tools/selector/CategorySelector";
import { QuoteCardCategoryType } from "@/data/constants/quoteCard/QuoteCardCategory";
import { toast } from "sonner";

interface EditorSettingDialogProps {
  closeDialog: () => void;
}

export const EditorSettingDialog: FC<EditorSettingDialogProps> = ({
  closeDialog,
}) => {
  const { editorConfig, state, dispatch } = useEditor();
  const mutation = useQuoteCardUpdate();

  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState<QuoteCardCategoryType>();
  const [tagInput, setTagInput] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setTags(editorConfig.tags);
    setCategory(editorConfig.category);
    setIsPublic(editorConfig.isPublic);
    setIsChanged(false);
  }, [editorConfig]);

  useEffect(() => {
    const hasChanged =
      category !== editorConfig.category ||
      isPublic !== editorConfig.isPublic ||
      JSON.stringify(tags.sort()) !== JSON.stringify(editorConfig.tags.sort());

    setIsChanged(hasChanged);
  }, [category, tags, isPublic, editorConfig]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();

      const value = e.currentTarget.value;

      setTags((current) => [...current, value]);

      setTagInput("");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleRemove = (index: number) => {
    setTags((current) => current.filter((item, _index) => _index !== index));
  };

  const renderTag = (tag: string, index: number) => {
    return (
      <div
        className="flex items-center justify-center rounded-md bg-gray-200 p-2 gap-2"
        key={`${tag}-${index}`}
      >
        <span className="font-medium text-xs">{tag}</span>
        <button type="button" onClick={() => handleRemove(index)}>
          <Cross1Icon />
        </button>
      </div>
    );
  };

  const handleSaveEditorConfig = () => {
    if (state.id) {
      mutation.mutate(
        {
          body: {
            id: state.id,
            data: {
              category,
              tags,
              isPublic,
            },
          },
        },
        {
          onSuccess: () => {
            dispatch({
              type: "UPDATE_CONFIG",
              payload: {
                isPublic,
                tags,
                category,
              },
            });

            toast.success("성공적으로 저장되었습니다");
            closeDialog();
          },
          onError: () => {
            toast.error("인용 카드 업데이트에 실패했습니다. 다시 시도해주세요");
            closeDialog();
          },
        }
      );
    }
  };

  return (
    <Dialog.Portal>
      <DialogOverlay />
      <Dialog.Content className=" z-11 fixed shadow-md left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] focus:outline-none data-[state=open]:animate-contentShow">
        <Dialog.Title className="m-0 text-[17px] font-medium text-foreground">
          인용 카드 설정
        </Dialog.Title>
        <Dialog.Description className="mb-8 mt-2.5 text-sm leading-normal text-muted-foreground">
          카테고리, 태그, 노출 조건에 대한 검색 설정을 해보세요
        </Dialog.Description>

        <div className="mb-4">
          <fieldset className="mb-4 flex items-center gap-4">
            <label
              className="pr-4 text-sm font-medium leading-none text-foreground"
              htmlFor="tag"
            >
              태그
            </label>
            <input
              className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none outline-none disabled:bg-gray-100"
              id="tag"
              placeholder="태그를 추가하세요 (최대 5개)"
              value={tagInput}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              disabled={tags.length >= 5}
            />
          </fieldset>

          <div className="flex items-center gap-1">{tags.map(renderTag)}</div>
        </div>

        <div className="mb-8 flex items-center">
          <p className="pr-4 text-sm font-medium leading-none text-foreground">
            공개여부
          </p>
          <Switch
            id="public-hidden"
            checked={isPublic}
            onCheckedChange={setIsPublic}
          />
        </div>

        <CategorySelector
          category={category as string}
          onValueChange={(value) => setCategory(value as QuoteCardCategoryType)}
        />

        <div className="mt-[25px] flex justify-end">
          <Button
            variant="blue"
            disabled={!isChanged || mutation.isPending}
            onClick={handleSaveEditorConfig}
          >
            <p>저장</p>
          </Button>
        </div>
        <DialogClose />
      </Dialog.Content>
    </Dialog.Portal>
  );
};
