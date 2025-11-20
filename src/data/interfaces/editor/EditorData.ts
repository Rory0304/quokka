import { TextAlignType } from "@/data/constants/editor/TextAlign";
import { FontFamilyType } from "@/data/constants/editor/FontFamily";
import { AspectRatioType } from "@/data/constants/editor/AspectRatio";
import { FontSizeType } from "@/data/constants/editor/FontSize";
import { EditorBackgroundColorType } from "./EditorBackgroundColor";

export interface EditorData {
  content: string;
  author: string;
  backgroundColor: EditorBackgroundColorType;
  fontSize: FontSizeType;
  textAlign: TextAlignType;
  fontFamily: FontFamilyType;
  aspectRatio: AspectRatioType;
}
