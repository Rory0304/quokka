import { Editor, EditorAction, EditorElement } from "./context";

export const reducer = (editor: Editor, action: EditorAction) => {
  switch (action.type) {
    case "UPDATE_CONFIG":
      return {
        ...editor,
        config: {
          ...editor.config,
          ...action.payload,
        },
      };

    case "UPDATE_ELEMENT": {
      const newEditorData = editor.elements.map((element) => {
        if (element.id !== action.payload.id) return element;
        else {
          const newElement: EditorElement = {
            ...element,
            ...action.payload,
          };

          return newElement;
        }
      });

      console.log({
        ...editor,
        elements: newEditorData,
      });

      return {
        ...editor,
        elements: newEditorData,
      };
    }

    default:
      return editor;
  }
};
