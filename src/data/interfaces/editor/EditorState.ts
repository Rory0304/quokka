import { EditorElement } from "./EditorElement";

export interface EditorState {
  selectedLayerId: string | null;
  selectedElement: EditorElement | null;
}
