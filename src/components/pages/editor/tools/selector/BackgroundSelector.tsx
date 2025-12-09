import { GradientColorPicker } from "@/components/blocks/colorPicker/GradientColorPicker";
import { BackgroundColor } from "@/data/constants/editor/BackgroundColor";
import { EditorBackgroundColorType } from "@/data/interfaces/editor/EditorBackgroundColor";
import { useEditor } from "@/hooks/editor/useEditor";
import { cn } from "@/libs/styles/cn";
import { BlendingModeIcon } from "@radix-ui/react-icons";
import React, { FC, useState } from "react";

export const BackgroundSelector: FC = () => {
  const { dispatch, editorLayout } = useEditor();

  const [open, setOpen] = useState(false);

  const handleBackgroundChange = ({
    color,
    backgroundColorType,
  }: {
    color?: string;
    backgroundColorType?: EditorBackgroundColorType;
  }) => {
    if (color) {
      dispatch({
        type: "UPDATE_LAYOUT",
        payload: {
          layout: { customBackgroundColor: color, backgroundColor: undefined },
        },
      });

      return;
    }

    if (backgroundColorType) {
      dispatch({
        type: "UPDATE_LAYOUT",
        payload: {
          layout: {
            customBackgroundColor: undefined,
            backgroundColor: backgroundColorType,
          },
        },
      });

      return;
    }
  };

  const handleColorPickerOpen = () => {
    setOpen((current) => !current);
  };

  return (
    <div className="flex gap-2 py-4 relative">
      <button
        type="button"
        onClick={handleColorPickerOpen}
        className={cn(
          "p-2 w-12 h-12 rounded-md flex items-center justify-center",
          Boolean(editorLayout?.customBackgroundColor)
            ? "border-2 border-blue-500"
            : "border border-gray-400"
        )}
        style={{
          background: editorLayout?.customBackgroundColor,
        }}
      >
        {typeof editorLayout?.customBackgroundColor === "undefined" ? (
          <BlendingModeIcon color="gray" />
        ) : null}
      </button>

      <GradientColorPicker
        open={open}
        value={editorLayout?.customBackgroundColor}
        onChange={(color) => handleBackgroundChange({ color })}
      />

      {BackgroundColor.map((item, index) => (
        <BackgroundColorItem
          key={`background-item-${index}`}
          item={item}
          active={item.bgColor === editorLayout?.backgroundColor?.bgColor}
          onClick={() =>
            handleBackgroundChange({
              backgroundColorType: item,
            })
          }
        />
      ))}
    </div>
  );
};

const BackgroundColorItem: FC<{
  item: EditorBackgroundColorType;
  active: boolean;
  onClick: () => void;
}> = ({ item, active, onClick }) => {
  return (
    <button type="button" onClick={onClick} aria-label={item.alt}>
      <div
        className={cn(
          "rounded-md w-12 h-12 border-2",
          active ? "border-blue-500" : "border-gray-50"
        )}
        style={{
          background: item.bgColor,
        }}
      ></div>
    </button>
  );
};
