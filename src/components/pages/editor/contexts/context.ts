import { createContext, RefObject } from "react";
import { BackgroundColor } from "@/data/constants/editor/BackgroundColor";
import { TextAlign } from "@/data/constants/editor/TextAlign";
import { FontFamily } from "@/data/constants/editor/FontFamily";
import { AspectRatio } from "@/data/constants/editor/AspectRatio";
import { nanoid } from "nanoid";

import { EditorElement } from "@/data/interfaces/editor/EditorElement";
import { EditorConfig } from "@/data/interfaces/editor/EditorConfig";
import { Layout } from "@/data/interfaces/editor/EditorLayout";
import { EditorData } from "@/data/interfaces/editor";
import { EditorState } from "@/data/interfaces/editor/EditorState";
import { Editor } from "@/data/interfaces/editor/Editor";
import { EditorTemplate } from "@/data/interfaces/editor/EditorTemplate";

export type EditorAction =
  | {
      type: "INIT_STATE";
      payload: Editor;
    }
  | {
      type: "UPDATE_CONFIG";
      payload: Partial<EditorConfig>;
    }
  | {
      type: "UPDATE_TEMPLATE";
      payload: {
        template: Partial<EditorTemplate>;
      };
    }
  | {
      type: "UPDATE_LAYOUT";
      payload: {
        layout: Partial<Layout>;
      };
    }
  | {
      type: "UPDATE_ELEMENT";
      payload: {
        element: EditorElement;
      };
    }
  | {
      type: "UPDATE_SELECTED_ELEMENT";
      payload: EditorState["selectedElement"];
    };

const initialElementId = nanoid();

const initialEditorData: EditorData = {
  id: initialElementId,
  template: {
    type: null,
    color: "#e4e4e4",
  },
  layout: {
    backgroundColor: BackgroundColor[0],
    aspectRatio: AspectRatio.square,
  },
  elements: [
    {
      type: "text",
      content: {
        id: "__text_content",
        text: "",
        fontSize: 16,
        textAlign: TextAlign.left,
        fontFamily: FontFamily.serif,
        color: "#fff",
      },
    },
    {
      type: "text",
      content: {
        id: "__text_author",
        text: "",
        fontSize: 12,
        textAlign: TextAlign.left,
        fontFamily: FontFamily.serif,
        color: "#fff",
      },
    },
  ],
};

export const initalEditorState: Editor = {
  config: {
    title: "무제",
    category: "etc",
    tags: [],
    isPublic: false,
  },
  state: {
    selectedLayerId: initialElementId,
    selectedElement: null,
  },
  data: [initialEditorData],
};

export const EditorValueContext = createContext<Editor>(initalEditorState);

export const EditorDispatchContext = createContext<
  React.Dispatch<EditorAction>
>(() => {});

//
//
//
interface EditorHandler {
  quoteCardRef: RefObject<HTMLDivElement | null> | null;
}

export const EditorHandlerContext = createContext<EditorHandler>({
  quoteCardRef: null,
});
