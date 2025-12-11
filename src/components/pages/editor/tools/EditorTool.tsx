'use client';

import React, { FC } from 'react';

import { useEditor } from '@/hooks/editor/useEditor';

import { FrameTool } from './frame/FrameTool';
import { TextContainerTool } from './text/TextContainerTool';

export const EditorTool: FC = () => {
  const {
    editorState: { selectedElement },
  } = useEditor();

  return (
    <div className="bg-white border-l border-l-gray-300 flex-[0.4] relative">
      {!selectedElement && <FrameTool />}
      {selectedElement?.type === 'text' && (
        <TextContainerTool selectedElement={selectedElement} />
      )}
    </div>
  );
};
