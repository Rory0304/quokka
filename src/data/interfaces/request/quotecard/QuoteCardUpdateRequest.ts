import { EditorData } from "../../editor";

export interface QuoteCardUpdateRequest {
  id: EditorData["id"];
  isPublic: boolean;
}
