export const FontSize = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
} as const;

export type FontSizeType = keyof typeof FontSize;

export const FontSizeMap: Record<
  FontSizeType,
  { size: string; label: string }
> = {
  [FontSize.xs]: {
    size: "10px",
    label: "더 작게",
  },
  [FontSize.sm]: {
    size: "14px",
    label: "작게",
  },
  [FontSize.md]: {
    size: "16px",
    label: "중간",
  },
  [FontSize.lg]: {
    size: "20px",
    label: "크게",
  },
  [FontSize.xl]: {
    size: "24px",
    label: "더 크게",
  },
};
