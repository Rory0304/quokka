import React, { FC } from "react";
import { EditorActions } from "./EditorActions";
import { EditorTitleInput } from "./EditorTitleInput";

export const EditorNavigation: FC = () => {
  return (
    <div className="fixed z-10 w-full h-16 max-h-16">
      <div className="mx-auto bg-white border-b border-gray-300 px-4 flex items-center justify-between h-full">
        <EditorTitleInput />
        <EditorActions />
      </div>
    </div>
  );
};
