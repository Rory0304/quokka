import {
  FontSize,
  FontSizeMap,
  FontSizeType,
} from "@/data/constants/editor/FontSize";
import { useEditor } from "@/hooks/editor/useEditor";
import React, { FC } from "react";

export const FontSizeSelector: FC = () => {
  const {
    dispatch,
    state: { fontSize },
  } = useEditor();

  return (
    <div className="flex items-center gap-2 py-4 px-4">
      {(Object.keys(FontSize) as FontSizeType[]).map((item) => (
        <FontSizeItem
          font={item}
          key={item}
          active={item === fontSize}
          onClick={() =>
            dispatch({
              type: "CHANGE_FONTSIZE",
              payload: { fontSize: item },
            })
          }
        />
      ))}
    </div>
  );
};

const FontSizeItem: FC<{
  font: FontSizeType;
  active: boolean;
  onClick: () => void;
}> = ({ font, active, onClick }) => {
  return (
    <button type="button" onClick={onClick} className="cursor-pointer">
      <span
        className="border rounded-md p-2"
        style={{
          fontSize: FontSizeMap[font].size,
          borderColor: active ? "#999999" : "transparent",
        }}
      >
        {FontSizeMap[font].label}
      </span>
    </button>
  );
};
