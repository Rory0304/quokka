import { GradientColorPicker } from "@/components/blocks/colorPicker/GradientColorPicker";
import { EditorElement } from "@/data/interfaces/editor/EditorElement";
import { useEditor } from "@/hooks/editor/useEditor";
import { BlendingModeIcon } from "@radix-ui/react-icons";
import React, { FC, useState } from "react";

interface TextColorSelectorProps {
  element: EditorElement;
}

export const TextColorSelector: FC<TextColorSelectorProps> = ({ element }) => {
  const { dispatch } = useEditor();

  const { color } = element.content;
  const [open, setOpen] = useState(false);

  const handleTextColorChange = (color: string) => {
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        element: {
          ...element,
          content: {
            ...element.content,
            color,
          },
        },
      },
    });
  };

  return (
    <div className="flex items-center gap-6 py-4 ">
      <BlendingModeIcon color="gray" />

      <button type="button" onClick={() => setOpen((current) => !current)}>
        <div
          className="w-6 h-6 rounded-md border border-gray-400"
          style={{
            backgroundColor: color,
          }}
        />
      </button>
      <GradientColorPicker
        hideGradientControls
        open={open}
        value={color}
        onChange={handleTextColorChange}
      />
    </div>
  );
};
