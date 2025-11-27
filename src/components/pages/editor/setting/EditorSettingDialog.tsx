import { DialogActionButton } from "@/components/blocks/dialog/DialogActionButton";
import { DialogClose } from "@/components/blocks/dialog/DialogClose";
import { DialogOverlay } from "@/components/blocks/dialog/DialogOverlay";
import { Select } from "@/components/blocks/select/Select";
import { Switch } from "@/components/blocks/switch/Switch";
import { useEditor } from "@/hooks/editor/useEditor";
import { Cross1Icon } from "@radix-ui/react-icons";

import { Dialog } from "radix-ui";
import React, { ChangeEvent, FC, useEffect, useState } from "react";

const categoryItems = [
  {
    value: "movie",
    label: "영화",
  },
  {
    value: "book",
    label: "책",
  },
  {
    value: "etc",
    label: "기타",
  },
];

export const EditorSettingDialog: FC = () => {
  const { editorConfig } = useEditor();

  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState<string>(categoryItems[0].value);
  const [tagInput, setTagInput] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    setTags(editorConfig.tags);
    setCategory(editorConfig.category);
    setIsPublic(editorConfig.isPublic);
  }, [editorConfig]);

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

  const handleSaveEditorConfig = () => {};

  const renderTag = (tag: string, index: number) => {
    return (
      <div
        className="flex items-center justify-center rounded-md bg-green-100 p-2 gap-2"
        key={`${tag}-${index}`}
      >
        <span className="font-medium text-xs">{tag}</span>
        <button type="button" onClick={() => handleRemove(index)}>
          <Cross1Icon />
        </button>
      </div>
    );
  };

  return (
    <Dialog.Portal>
      <DialogOverlay />
      <Dialog.Content className="fixed shadow-md left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] focus:outline-none data-[state=open]:animate-contentShow">
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

        <Switch
          label="공개 여부"
          id="public-hidden"
          className="mb-8"
          checked={isPublic}
        />

        <Select
          label="카테고리"
          value={category}
          items={categoryItems}
          onValueChange={(value: string) => {
            setCategory(value);
          }}
        />

        <div className="mt-[25px] flex justify-end">
          <DialogActionButton label="저장" />
        </div>
        <DialogClose />
      </Dialog.Content>
    </Dialog.Portal>
  );
};
