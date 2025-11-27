import { EditorElement } from "@/components/pages/editor/contexts/context";
import { useEditor } from "@/hooks/editor/useEditor";
import React, { FC } from "react";

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
      type: "UPDATE_SELECTED_ELEMENT",
      payload: element,
    });
  };

  return <div onClick={handleClick}>{children}</div>;
};
