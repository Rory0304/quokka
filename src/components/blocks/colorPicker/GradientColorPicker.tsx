'use client';

import { FC, useEffect, useRef, useState } from 'react';
import ColorPicker from 'react-best-gradient-color-picker';

import { cn } from '@/libs/styles/cn';
import { throttle } from 'es-toolkit/function';
import { ClassNameValue } from 'tailwind-merge';

interface GradientColorPickerProps {
  open: boolean;
  value?: string;
  className?: ClassNameValue;
  onChange: (color: string) => void;
}

export const GradientColorPicker: FC<GradientColorPickerProps> = ({
  open,
  value,
  className = 'bottom-0 left-[-240px]',
  onChange,
}) => {
  const initialColor = useRef(value);
  const [color, setColor] = useState(value);

  useEffect(() => {
    if (initialColor.current !== value) {
      initialColor.current = value;
      setColor(value);
    }
  }, [value]);

  const handleColorChange = throttle((color: string) => {
    setColor(color);

    if (color) {
      onChange(color);
    }
  }, 300);

  if (!open) return null;

  return (
    <ColorPicker
      width={240}
      height={240}
      className={cn('gradient_color_picker', 'absolute', className)}
      hideColorGuide
      hidePresets
      hideInputs
      hideAdvancedSliders
      disableDarkMode
      value={color}
      onChange={handleColorChange}
      style={{
        body: {
          boxShadow: '0px 0px 2px 1px #dddddd',
          borderRadius: '8px',
          zIndex: 1,
        },
      }}
    />
  );
};
