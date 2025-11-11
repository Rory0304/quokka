import { createContext } from "react";
import { BackgroundColor } from "@/data/constants/editor/BackgroundColor";
import { EditorBackgroundColorType } from "@/data/interfaces/editor/EditorBackgroundColor";
import { FontSize, FontSizeType } from "@/data/constants/editor/FontSize";
import { TextAlign, TextAlignType } from "@/data/constants/editor/TextAlign";

export interface EditorState {
  content: string;
  author: string;
  backgroundColor: EditorBackgroundColorType;
  fontSize: FontSizeType;
  textAlign: TextAlignType;
}

export type EditorAction =
  | {
      type: "CHANGE_BACKGROUND";
      payload: { backgroundColor: EditorBackgroundColorType };
    }
  | {
      type: "CHANGE_CONTENT";
      payload: { content: string };
    }
  | {
      type: "CHANGE_FONTSIZE";
      payload: { fontSize: FontSizeType };
    }
  | {
      type: "CHANGE_TEXTALIGN";
      payload: { textAlign: TextAlignType };
    };

export const initalEditorState: EditorState = {
  content: "",
  author: "",
  backgroundColor: BackgroundColor[0],
  fontSize: FontSize.md,
  textAlign: TextAlign.left,
};

export const EditorValueContext = createContext<EditorState>(initalEditorState);

export const EditorDispatchContext = createContext<
  React.Dispatch<EditorAction>
>(() => {});
