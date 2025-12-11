export const AspectRatio = {
  square: 'square',
  vertical: 'vertical',
} as const;

export type AspectRatioType = keyof typeof AspectRatio;

export const AspectRatioMap: Record<
  AspectRatioType,
  {
    label: string;
    value: number;
  }
> = {
  square: {
    label: '정방형',
    value: 1,
  },

  vertical: {
    label: '세로형',
    value: 3 / 4,
  },
};
