import { BackgroundColor } from "@/data/constants/editor/BackgroundColor";
import { EditorBackgroundColorType } from "@/data/interfaces/editor/EditorBackgroundColor";
import { useEditor } from "@/hooks/editor/useEditor";
import React, { FC } from "react";

export const BackgroundSelector: FC = () => {
  const { dispatch } = useEditor();

  return (
    <div className="flex gap-2 py-4 px-4">
      {BackgroundColor.map((item, index) => (
        <BackgroundColorItem
          key={`background-item-${index}`}
          item={item}
          onClick={() =>
            dispatch({
              type: "CHANGE_BACKGROUND",
              payload: { backgroundColor: item },
            })
          }
        />
      ))}
    </div>
  );
};

const BackgroundColorItem: FC<{
  item: EditorBackgroundColorType;
  onClick: () => void;
}> = ({ item, onClick }) => {
  return (
    <button type="button" onClick={onClick} aria-label={item.alt}>
      <div
        className={"rounded-md w-12 h-12"}
        style={{
          background: item.bgColor,
        }}
      ></div>
    </button>
  );
};
