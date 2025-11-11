import {
  TextAlign,
  TextAlignMap,
  TextAlignType,
} from "@/data/constants/editor/TextAlign";
import { useEditor } from "@/hooks/editor/useEditor";
import React, { FC } from "react";

const TextAlignSelector: FC = () => {
  const {
    dispatch,
    state: { textAlign },
  } = useEditor();

  return (
    <div className="flex items-center gap-2 py-4 px-4">
      {(Object.keys(TextAlign) as TextAlignType[]).map((item) => (
        <TextAlignItem
          textAlign={item}
          key={item}
          active={item === textAlign}
          onClick={() =>
            dispatch({
              type: "CHANGE_TEXTALIGN",
              payload: { textAlign: item },
            })
          }
        />
      ))}
    </div>
  );
};

const TextAlignItem: FC<{
  textAlign: TextAlignType;
  onClick: () => void;
  active: boolean;
}> = ({ textAlign, onClick, active }) => {
  return (
    <button type="button" onClick={onClick} className="cursor-pointer">
      <span
        className="border rounded-md p-2"
        style={{
          textAlign,
          borderColor: active ? "#999999" : "transparent",
        }}
      >
        {TextAlignMap[textAlign]}
      </span>
    </button>
  );
};

export default TextAlignSelector;
