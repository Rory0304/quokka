import { FontFamilyType } from "@/data/constants/editor/FontFamily";
import { TextAlignType } from "@/data/constants/editor/TextAlign";

/**
 * Text Element
 */
export interface EditorElement {
  type: "text";
  content: TextElement;
}

export interface TextElement {
  id: string;
  fontSize: number;
  textAlign: TextAlignType;
  fontFamily: FontFamilyType;
  text: string;
}
