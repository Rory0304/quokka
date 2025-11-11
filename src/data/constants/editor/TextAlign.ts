export const TextAlign = {
  left: "left",
  center: "center",
  right: "right",
} as const;

export const TextAlignMap: Record<TextAlignType, string> = {
  [TextAlign.left]: "왼쪽 정렬",
  [TextAlign.center]: "가운데 정렬",
  [TextAlign.right]: "오른쪽 정렬",
};

export type TextAlignType = keyof typeof TextAlign;
