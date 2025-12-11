import React, { FC } from 'react';

import { AspectRatioSelector, BackgroundSelector } from '../selector';
import { Sheet } from '../sheet';
import { TemplateSelector } from '../template/TemplateSelector';

export const FrameTool: FC = () => {
  return (
    <Sheet.Container>
      <Sheet.Title
        title="도구"
        description="도구 항목들을 이용하여 인용 카드를 꾸며보세요."
      />
      <Sheet.Divider />

      <TemplateSelector />

      <Sheet.ItemContainer>
        <Sheet.ItemTitle title="배경색 설정" />
        <BackgroundSelector />
        <Sheet.ItemTitle title="레이아웃 설정" />
        <AspectRatioSelector />
      </Sheet.ItemContainer>
    </Sheet.Container>
  );
};
