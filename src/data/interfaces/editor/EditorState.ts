import { EditorElement } from "./EditorElement";

export interface EditorState {
  isDirty: boolean;
  isSaving?: boolean;
  selectedLayerId: string | null;
  selectedElement: EditorElement | null;
}
