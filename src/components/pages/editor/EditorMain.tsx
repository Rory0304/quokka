import { useEditor } from "@/hooks/editor/useEditor";
import React, { FC } from "react";
import { QuoteCard } from "./element/QuoteCard";
import { useEditorHandler } from "@/hooks/editor/useEditorHandler";

export const EditorMain: FC = () => {
  const { editorData, dispatch } = useEditor();
  const { quoteCardRef } = useEditorHandler();

  const handleClick = () => {
    dispatch({
      type: "UPDATE_SELECTED_ELEMENT",
      payload: null,
    });
  };

  return (
    <div
      onClick={handleClick}
      className="w-full flex h-full flex-1 justify-center items-center"
    >
      {editorData.map((element) => (
        <QuoteCard ref={quoteCardRef} key={element.id} {...element} />
      ))}
    </div>
  );
};
