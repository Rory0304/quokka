"use client";

import { useDebounce } from "@/hooks/common";
import React, { FC, useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";

interface GradientColorPickerProps {
  open: boolean;
  value?: string;
  onChange: (color: string) => void;
}

export const GradientColorPicker: FC<GradientColorPickerProps> = ({
  open,
  value,
  onChange,
}) => {
  const [color, setColor] = useState(value);

  const _ = useDebounce({
    deps: [color],
    ms: 200,
    fn: () => {
      if (color) {
        onChange(color);
      }
    },
  });

  const handleColorChange = (color: string) => {
    setColor(color);
  };

  if (!open) return null;

  return (
    <ColorPicker
      width={240}
      height={240}
      className="absolute right-14 bottom-0"
      hideColorGuide
      hidePresets
      hideInputs
      hideAdvancedSliders
      disableDarkMode
      value={color}
      onChange={handleColorChange}
      style={{
        body: {
          boxShadow: "0px 0px 2px 1px #dddddd",
          borderRadius: "8px",
        },
      }}
    />
  );
};
