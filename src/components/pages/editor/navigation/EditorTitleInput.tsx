import { useEditor } from "@/hooks/editor/useEditor";
import React, { ChangeEvent, FC } from "react";

export const EditorTitleInput: FC = () => {
  const {
    dispatch,
    editorConfig: { title },
  } = useEditor();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    dispatch({
      type: "UPDATE_CONFIG",
      payload: {
        title: value,
      },
    });
  };

  return (
    <div>
      <input onChange={handleOnChange} defaultValue={title} />
    </div>
  );
};
