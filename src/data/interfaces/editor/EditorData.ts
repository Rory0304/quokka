import { TemplateType } from "@/data/constants/editor/Template";
import { EditorElement } from "./EditorElement";
import { Layout } from "./EditorLayout";

export interface EditorData {
  id: string;
  template: {
    type: TemplateType | null;
    color: string
  };
  layout: Layout;
  elements: EditorElement[];
}
