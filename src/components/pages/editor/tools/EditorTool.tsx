import React, { FC } from "react";
import { BackgroundSelector } from "./BackgroundSelector";
import { FontSizeSelector } from "./FontSizeSelector";
import TextAlignSelector from "./TextAlignSelector";

export const EditorTool: FC = () => {
  return (
    <div>
      <BackgroundSelector />
      <FontSizeSelector />
      <TextAlignSelector />
    </div>
  );
};
