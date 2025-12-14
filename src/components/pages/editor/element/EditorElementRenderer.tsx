import React, { FC } from 'react';

import { EditorData } from '@/data/interfaces/editor';
import { useEditor } from '@/hooks/editor/useEditor';

import { TemplatePlaceholderRenderer } from '../tools/template/TemplatePlaceholder';
import { ElementWrapper } from './ElementWrapper';
import { TextElement } from './TextElement';

export const EditorElementRenderer: FC<{
  elements: EditorData['elements'];
}> = ({ elements }) => {
  const { dispatch, editorTemplate } = useEditor();

  return (
    <TemplatePlaceholderRenderer template={editorTemplate}>
      {elements.map(element => (
        <ElementWrapper key={element.content.id} element={element}>
          <TextElement
            className="text_element"
            defaultValue={element.content.text}
            placeholder={'내용을 입력해주세요'}
            fontSize={element.content.fontSize}
            textAlign={element.content.textAlign}
            color={element.content.color}
            fontFamily={element.content.fontFamily}
            onClick={() => {
              dispatch({
                type: 'UPDATE_SELECTED_ELEMENT',
                payload: element,
              });
            }}
            onChange={value =>
              dispatch({
                type: 'UPDATE_ELEMENT',
                payload: {
                  element: {
                    ...element,
                    content: {
                      ...element.content,
                      text: value,
                    },
                  },
                },
              })
            }
          />
        </ElementWrapper>
      ))}
    </TemplatePlaceholderRenderer>
  );
};
