import { EditorElement, TextElement } from "@/components/pages/editor/contexts/context";
import {
  TextAlign,
  TextAlignMap,
  TextAlignType,
} from "@/data/constants/editor/TextAlign";
import { useEditor } from "@/hooks/editor/useEditor";
import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";
import React, { FC } from "react";

interface TextAlignSelectorProps {
  element: EditorElement;
}

export const TextAlignSelector: FC<TextAlignSelectorProps> = ({ element }) => {
  const { dispatch } = useEditor();
  const {
    content: { textAlign },
  } = element;

  return (
    <div className="flex items-center gap-2 py-4 px-4">
      {(Object.keys(TextAlign) as TextAlignType[]).map((item) => (
        <TextAlignItem
          textAlign={item}
          key={item}
          active={item === textAlign}
          onClick={() =>
            dispatch({
              type: "UPDATE_ELEMENT",
              payload: {
                element: {
                  ...element,
                  content: {
                    ...element.content,
                    textAlign: item,
                  },
                },
              },
            })
          }
        />
      ))}
    </div>
  );
};

const TextAlignIcon: FC<{
  textAlign: TextAlignType;
  label: string;
}> = ({ textAlign, label }) => {
  switch (textAlign) {
    case "center":
      return <TextAlignCenterIcon aria-label={label} />;
    case "left":
      return <TextAlignLeftIcon aria-label={label} />;
    case "right":
      return <TextAlignRightIcon aria-label={label} />;
    default:
      return null;
  }
};

const TextAlignItem: FC<{
  textAlign: TextAlignType;
  onClick: () => void;
  active: boolean;
}> = ({ textAlign, active, onClick }) => {
  return (
    <button type="button" onClick={onClick} className="cursor-pointer">
      <div
        className="rounded-md p-2"
        style={{
          backgroundColor: active ? "#f1f1f1" : "transparent",
        }}
      >
        <TextAlignIcon textAlign={textAlign} label={TextAlignMap[textAlign]} />
      </div>
    </button>
  );
};
