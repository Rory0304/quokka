import { EditorConfig } from "./EditorConfig";
import { EditorData } from "./EditorData";
import { EditorState } from "./EditorState";

export interface Editor {
  id?: string;
  config: EditorConfig;
  state: EditorState;
  intiailData: {
    config: EditorConfig;
    data: EditorData[];
  } | null;
  data: EditorData[];
}
