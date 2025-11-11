import { FontSize } from "@/data/constants/editor/FontSize";
import { EditorAction, EditorState } from "./context";
import { TextAlign } from "@/data/constants/editor/TextAlign";

export const reducer = (state: EditorState, action: EditorAction) => {
  switch (action.type) {
    case "CHANGE_BACKGROUND":
      return {
        ...state,
        backgroundColor: action.payload.backgroundColor,
      };

    case "CHANGE_CONTENT":
      return {
        ...state,
        content: action.payload.content,
      };

    case "CHANGE_FONTSIZE":
      return {
        ...state,
        fontSize: action.payload.fontSize,
      };

    case "CHANGE_TEXTALIGN":
      return {
        ...state,
        textAlign: action.payload.textAlign,
      };
  }
};
