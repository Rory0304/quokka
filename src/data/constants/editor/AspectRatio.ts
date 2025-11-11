export const AspectRatio = {
  square: "square",
  vertical: "aspect-3/4",
} as const;

export type AspectRatioType = keyof typeof AspectRatio;

export const AspectRatioMap: Record<AspectRatioType, string> = {
  square: "정방형",
  vertical: "세로형",
};
