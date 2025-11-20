import { createContext, RefObject } from "react";
import { BackgroundColor } from "@/data/constants/editor/BackgroundColor";
import { EditorBackgroundColorType } from "@/data/interfaces/editor/EditorBackgroundColor";
import { FontSize, FontSizeType } from "@/data/constants/editor/FontSize";
import { TextAlign, TextAlignType } from "@/data/constants/editor/TextAlign";
import { FontFamily, FontFamilyType } from "@/data/constants/editor/FontFamily";
import {
  AspectRatio,
  AspectRatioType,
} from "@/data/constants/editor/AspectRatio";
import { nanoid } from "nanoid";
import { QuoteCardHandler } from "@/components/pages/editor/element/QuoteCard";

/**
 * 선택된 element 상태값
 */
export interface EditorState {
  selectedElement: EditorElement;
}

/**
 * 기본 정보
 */
export interface EditorConfig {
  title: string;
}

/**
 * 개별 element
 */
export interface EditorElement {
  id: string;

  content: string;
  author: string; // [TODO] Reference 로 변수명 수정

  // [TODO] BackgroundColor 하나의 필드로 합칠 수 있는 방법이 있을지 확인
  customBackgroundColor?: string;
  backgroundColor?: EditorBackgroundColorType;

  fontSize: FontSizeType;
  textAlign: TextAlignType;
  fontFamily: FontFamilyType;
  aspectRatio: AspectRatioType;
}

export interface Editor {
  config: EditorConfig;
  state: EditorState;
  elements: EditorElement[];
}

/**
 * [TODO] update 로직은 모두 partial 로 바꾼다.
 */
export type EditorAction =
  | {
      type: "UPDATE_CONFIG";
      payload: Partial<EditorConfig>;
    }
  | {
      type: "UPDATE_ELEMENT";
      payload: Partial<EditorElement>;
    };

const initialElementId = nanoid();

const initialEditorElement = {
  id: initialElementId,
  content: "",
  author: "",
  backgroundColor: BackgroundColor[0],
  fontSize: FontSize.md,
  textAlign: TextAlign.left,
  fontFamily: FontFamily.serif,
  aspectRatio: AspectRatio.square,
};

export const initalEditorState: Editor = {
  config: { title: "무제" },
  state: {
    selectedElement: initialEditorElement,
  },
  elements: [initialEditorElement],
};

export const EditorValueContext = createContext<Editor>(initalEditorState);

export const EditorDispatchContext = createContext<
  React.Dispatch<EditorAction>
>(() => {});

//
//
//
interface EditorHandler {
  quoteCardRef: RefObject<QuoteCardHandler | null> | null;
  generateQuoteCardImage: () => void;
  createQuoteCard: () => Promise<string | null>;
}

export const EditorHandlerContext = createContext<EditorHandler>({
  quoteCardRef: null,
  generateQuoteCardImage: () => {},
  createQuoteCard: async () => {
    return null;
  },
});
