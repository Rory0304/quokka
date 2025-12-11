'use client';

import React, { forwardRef } from 'react';

import { AspectRatioMap } from '@/data/constants/editor/AspectRatio';
import { EditorData } from '@/data/interfaces/editor';

import { EditorElementRenderer } from './EditorElementRenderer';

export const QuoteCard = forwardRef<HTMLDivElement, EditorData>(
  (props, ref) => {
    const { id, layout, elements } = props;
    const { backgroundColor, customBackgroundColor, aspectRatio } = layout;

    return (
      <div
        id={id}
        ref={ref}
        className="p-4 transition-all duration-300 ease-in-out"
        style={{
          width: '50%',
          height: 'auto',
          maxHeight: '100%',
          aspectRatio: AspectRatioMap[aspectRatio].value,
          background: backgroundColor?.bgColor ?? customBackgroundColor,
        }}
      >
        <div className="flex justify-center h-full flex-col gap-2 overflow-hidden">
          <EditorElementRenderer elements={elements} />
        </div>
      </div>
    );
  }
);

QuoteCard.displayName = 'QuoteCard';
