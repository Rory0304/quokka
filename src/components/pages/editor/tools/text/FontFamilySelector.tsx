import {
  FontFamily,
  FontFamilyMap,
  FontFamilyType,
} from "@/data/constants/editor/FontFamily";
import { EditorElement } from "@/data/interfaces/editor/EditorElement";

import { useEditor } from "@/hooks/editor/useEditor";
import {
  CheckIcon,
  ChevronDownIcon,
  FontStyleIcon,
} from "@radix-ui/react-icons";
import { Select } from "radix-ui";
import React, { FC, useRef } from "react";

interface FontFamilySelectorProps {
  element: EditorElement;
}

export const FontFamilySelector: FC<FontFamilySelectorProps> = ({
  element,
}) => {
  const selectorRef = useRef(null);

  const { dispatch } = useEditor();

  const {
    content: { fontFamily },
  } = element;

  return (
    <div className="flex items-center gap-6 py-4 min-w-20" ref={selectorRef}>
      <FontStyleIcon color="gray" />
      <Select.Root
        value={fontFamily}
        onValueChange={(value) => {
          dispatch({
            type: "UPDATE_ELEMENT",
            payload: {
              element: {
                ...element,
                content: {
                  ...element.content,
                  fontFamily: value as FontFamilyType,
                },
              },
            },
          });
        }}
      >
        <Select.Trigger
          aria-label="Font Family"
          className="flex items-center gap-2 bg-white outline-none"
        >
          <Select.Value placeholder={fontFamily} />
          <Select.Icon className="text-sm">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal container={selectorRef.current}>
          <Select.Content className="overflow-hidden rounded-md bg-white shadow-xl border border-gray-50">
            <Select.Viewport className="p-2">
              <Select.Group>
                {(Object.keys(FontFamily) as FontFamilyType[]).map((item) => (
                  <SelectItem fontFamily={item} key={item} />
                ))}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

const SelectItem: FC<{ fontFamily: FontFamilyType }> = ({ fontFamily }) => {
  return (
    <Select.Item
      value={fontFamily}
      className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-1 outline-none"
    >
      <Select.ItemText>
        <p
          className="text-md"
          style={{
            fontFamily: FontFamilyMap[fontFamily].value,
          }}
        >
          {FontFamilyMap[fontFamily].label}
        </p>
      </Select.ItemText>
      <Select.ItemIndicator className="inline-flex w-[25px] items-center justify-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
};

SelectItem.displayName = "SelectItem";
