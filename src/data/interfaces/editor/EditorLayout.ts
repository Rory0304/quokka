import { AspectRatioType } from "@/data/constants/editor/AspectRatio";
import { EditorBackgroundColorType } from "./EditorBackgroundColor";

export interface Layout {
  // [TODO] BackgroundColor 하나의 필드로 합칠 수 있는 방법이 있을지 확인
  customBackgroundColor?: string;
  backgroundColor?: EditorBackgroundColorType;
  aspectRatio: AspectRatioType;
}
