import { EditorElement } from './EditorElement';

export interface EditorState {
  isSaving?: boolean;
  selectedLayerId: string | null;
  selectedElement: EditorElement | null;
}
