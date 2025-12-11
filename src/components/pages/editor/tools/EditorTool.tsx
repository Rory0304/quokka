"use client";

import React, { FC } from "react";
import { TextContainerTool } from "./text/TextContainerTool";
import { FrameTool } from "./frame/FrameTool";
import { useEditor } from "@/hooks/editor/useEditor";

export const EditorTool: FC = () => {
  const {
    editorState: { selectedElement },
  } = useEditor();

  return (
    <div className="bg-white border-l border-l-gray-300 flex-[0.4] relative">
      {!selectedElement && <FrameTool />}
      {selectedElement?.type === "text" && (
        <TextContainerTool selectedElement={selectedElement} />
      )}
    </div>
  );
};
