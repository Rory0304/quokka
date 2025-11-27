import { Editor } from "@/data/interfaces/editor/Editor";
import { EditorAction } from "./context";
import { EditorData } from "@/data/interfaces/editor";

export const reducer = (editor: Editor, action: EditorAction): Editor => {
  switch (action.type) {
    case "INIT_STATE":
      return action.payload;

    case "UPDATE_CONFIG":
      return {
        ...editor,
        config: {
          ...editor.config,
          ...action.payload,
        },
      };

    case "UPDATE_TEMPLATE":
      const newEditorData = editor.data.map((data) => {
        if (data.id === editor.state.selectedLayerId) {
          const newData: EditorData = {
            ...data,
            template: {
              ...data.template,
              ...action.payload.template,
            },
          };
          return newData;
        } else return data;
      });

      return {
        ...editor,
        data: newEditorData,
      };

    case "UPDATE_SELECTED_ELEMENT":
      return {
        ...editor,
        state: {
          selectedLayerId: editor.state.selectedLayerId,
          selectedElement: action.payload,
        },
      };

    case "UPDATE_LAYOUT": {
      const newEditorData = editor.data.map((data) => {
        if (data.id === editor.state.selectedLayerId) {
          const newData: EditorData = {
            ...data,
            layout: {
              ...data.layout,
              ...action.payload.layout,
            },
          };
          return newData;
        } else return data;
      });

      return {
        ...editor,
        data: newEditorData,
      };
    }

    case "UPDATE_ELEMENT": {
      const newEditorData = editor.data.map((data) => {
        if (data.id !== editor.state.selectedLayerId) return data;
        else {
          const newElement: EditorData = {
            ...data,
            elements: data.elements.map((elem) => {
              if (elem.content.id !== action.payload.element.content?.id)
                return elem;

              return {
                ...elem,
                ...action.payload.element,
              };
            }),
          };

          return newElement;
        }
      });

      return {
        ...editor,
        data: newEditorData,
        state: {
          ...editor.state,
          selectedElement: action.payload.element,
        },
      };
    }

    default:
      return editor;
  }
};
