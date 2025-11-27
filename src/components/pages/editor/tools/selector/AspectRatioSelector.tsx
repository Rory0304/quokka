import {
  AspectRatio,
  AspectRatioMap,
  AspectRatioType,
} from "@/data/constants/editor/AspectRatio";
import React, { FC } from "react";
import { SelectorItem } from "./SelectorItem";
import { useEditor } from "@/hooks/editor/useEditor";

export const AspectRatioSelector: FC = () => {
  const { dispatch, editorLayout } = useEditor();

  return (
    <div className="flex items-center gap-2 py-4">
      {(Object.keys(AspectRatio) as AspectRatioType[]).map((item) => (
        <SelectorItem
          key={item}
          label={AspectRatioMap[item].label}
          active={item === editorLayout?.aspectRatio}
          onClick={() =>
            dispatch({
              type: "UPDATE_LAYOUT",
              payload: { layout: { aspectRatio: item } },
            })
          }
        />
      ))}
    </div>
  );
};
