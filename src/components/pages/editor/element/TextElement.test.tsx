import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TextElement } from './TextElement';

describe('TextElement', () => {
  it('순수 텍스트 내용이 보여져야 한다.', () => {
    const text = 'Hello world!';

    render(
      <TextElement
        defaultValue={text}
        fontSize={16}
        textAlign="left"
        fontFamily="serif"
        onClick={() => {}}
      />
    );

    expect(screen.queryAllByText(text)[0]).toBeVisible();
  });

  it('특수 문자의 내용이 보여져야 한다.', () => {
    const text = "Hello 👋 world! ✨ @#$%^&*()-_+={}[]|;:',.<>/?~";

    render(
      <TextElement
        defaultValue={text}
        fontSize={16}
        textAlign="left"
        fontFamily="serif"
        onClick={() => {}}
      />
    );

    expect(screen.queryAllByText(text)[0]).toBeVisible();
  });

  it('공백인 상태에서 <br> 태그가 보여지면 안 된다.', async () => {
    const { container } = render(
      <TextElement
        className="text-element"
        defaultValue={undefined}
        fontSize={16}
        textAlign="left"
        fontFamily="serif"
        onClick={() => {}}
      />
    );

    const element = container.querySelector('.text-element');
    expect(element?.innerHTML).toBe('');
  });

  it('XSS 공격 방지하여 sanitized된 결과가 보여져야 한다.', async () => {
    const { container } = render(
      <TextElement
        className="text-element"
        defaultValue={`<img src='x' onerror='alert("공격")'>`}
        fontSize={16}
        textAlign="left"
        fontFamily="serif"
        onClick={() => {}}
      />
    );

    const element = container.querySelector('.text-element');
    expect(element?.innerHTML).toBe('<img src="x">');
  });
});
