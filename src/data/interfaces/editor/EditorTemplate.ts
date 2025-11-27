import { TemplateType } from "@/data/constants/editor/Template";

export interface EditorTemplate {
  type: TemplateType | null;
  color: string;
}
