import React, { FC, useContext } from 'react';

import { useEditor } from '@/hooks/editor/useEditor';

import { EditorHandlerContext } from './contexts/context';
import { QuoteCard } from './element/QuoteCard';

export const EditorMain: FC = () => {
  const { editorData, dispatch } = useEditor();
  const { quoteCardRef } = useContext(EditorHandlerContext);

  const handleClick = () => {
    dispatch({
      type: 'UPDATE_SELECTED_ELEMENT',
      payload: null,
    });
  };

  return (
    <div
      onClick={handleClick}
      className="w-full flex flex-1 justify-center items-center"
    >
      {editorData.map(element => (
        <QuoteCard ref={quoteCardRef} key={element.id} {...element} />
      ))}
    </div>
  );
};
