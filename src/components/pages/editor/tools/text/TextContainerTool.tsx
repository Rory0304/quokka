"use client";

import { FC } from "react";
import {
  FontFamilySelector,
  FontSizeSelector,
  TextAlignSelector,
} from "../selector";
import { Sheet } from "../sheet";
import { EditorElement } from "@/data/interfaces/editor/EditorElement";
import { TextColorSelector } from "./TextColorSelector";

interface TextContainerToolProps {
  selectedElement: EditorElement;
}

export const TextContainerTool: FC<TextContainerToolProps> = ({
  selectedElement,
}) => {
  return (
    <Sheet.Container>
      <Sheet.Title title="텍스트 컨테이너 설정" />
      <Sheet.Divider />

      <Sheet.ItemContainer>
        <Sheet.ItemTitle title="글 설정" />
        <FontSizeSelector element={selectedElement} />
        <FontFamilySelector element={selectedElement} />
        <TextAlignSelector element={selectedElement} />
        <TextColorSelector element={selectedElement} />
      </Sheet.ItemContainer>
    </Sheet.Container>
  );
};
