// src/data/constants/editor/FontFamily.ts
export const FontFamily = {
  serif: 'serif',
  sans: 'sans',
  handwriting: 'handwriting',
} as const;

export type FontFamilyType = keyof typeof FontFamily;

export const FontFamilyMap: Record<
  FontFamilyType,
  { value: string; label: string; cssVar?: string }
> = {
  [FontFamily.serif]: {
    value: 'var(--font-editor-serif), serif',
    label: '명조체',
    cssVar: '--font-editor-serif',
  },
  [FontFamily.sans]: {
    value: 'var(--font-noto-sans-kr), sans-serif', // root layout의 폰트 재사용
    label: '고딕체',
  },
  [FontFamily.handwriting]: {
    value: 'var(--font-editor-handwriting), cursive',
    label: '손글씨',
    cssVar: '--font-editor-handwriting',
  },
};
