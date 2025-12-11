export const Template = {
  Underline: 'Underline',
  Bubble: 'Bubble',
  Vertical: 'Vertical',
} as const;

export type TemplateType = keyof typeof Template;

export const TemplateMap: Record<TemplateType, { label: string }> = {
  [Template.Bubble]: {
    label: '말풍선',
  },
  [Template.Underline]: {
    label: '라인&따옴표',
  },
  [Template.Vertical]: {
    label: '버티컬라인',
  },
};
