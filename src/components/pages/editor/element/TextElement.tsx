import {
  FontFamilyMap,
  FontFamilyType,
} from "@/data/constants/editor/FontFamily";
import React, { FC, useRef } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface TextElementProps {
  fontSize: number;
  textAlign: string;
  defaultValue?: string;
  fontFamily: FontFamilyType;
  placeholder?: string;
  color?: string;
  onClick: () => void;
  onChange?: (text: string) => void;
}

export const TextElement: FC<TextElementProps> = (props) => {
  const {
    fontSize,
    textAlign,
    fontFamily,
    placeholder,
    color = "#000",
    defaultValue,
    onChange,
    onClick,
  } = props;

  const textRef = useRef(defaultValue || "");

  const handleChange = (event: ContentEditableEvent) => {
    textRef.current = event.target.value;
    onChange?.(event.target.value);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const targetElement = event.target as HTMLElement; // or HTMLButtonElement, HTMLInputElement, etc.
    if (targetElement) {
      targetElement.innerText = event.clipboardData.getData("text/plain");
    }
  };

  return (
    <ContentEditable
      className="content-editable-placeholder overlfow-scroll"
      style={{
        color,
        marginBottom: "4px",
        fontSize: `${fontSize}px`,
        fontFamily: FontFamilyMap[fontFamily].value,
        textAlign,
      }}
      html={textRef.current}
      disabled={false}
      onChange={handleChange}
      onPaste={handlePaste}
      onClick={onClick}
      data-placeholder={placeholder}
    />
  );
};
