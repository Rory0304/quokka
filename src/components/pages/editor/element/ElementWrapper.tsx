import React, { FC } from 'react';

import { EditorElement } from '@/data/interfaces/editor/EditorElement';
import { useEditor } from '@/hooks/editor/useEditor';

interface ElementWrapperProps {
  element: EditorElement;
  children: React.ReactNode;
}

export const ElementWrapper: FC<ElementWrapperProps> = ({
  element,
  children,
}) => {
  const { dispatch } = useEditor();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    dispatch({
      type: 'UPDATE_SELECTED_ELEMENT',
      payload: element,
    });
  };

  return <div onClick={handleClick}>{children}</div>;
};
