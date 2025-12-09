import {
  FontFamilyMap,
  FontFamilyType,
} from "@/data/constants/editor/FontFamily";
import { cn } from "@/libs/styles/cn";
import React, { FC, useRef } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { ClassNameValue } from "tailwind-merge";
import DOMPurify from "dompurify";

interface TextElementProps {
  fontSize: number;
  textAlign: string;
  defaultValue?: string;
  fontFamily: FontFamilyType;
  placeholder?: string;
  color?: string;
  className?: ClassNameValue;
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
    className,
    onChange,
    onClick,
  } = props;

  const textRef = useRef(DOMPurify.sanitize(defaultValue || ""));

  const handleChange = (event: ContentEditableEvent) => {
    const htmlValue = event.target.value;
    const target = event.currentTarget as HTMLElement;

    // innerText를 사용하여 실제 텍스트 내용만 추출
    const textContent = target.innerText || target.textContent || "";

    // 빈 텍스트인 경우 빈 문자열로 설정 (HTML도 빈 문자열로)
    const normalizedValue = textContent.trim() === "" ? "" : htmlValue;
    const sanitizedValue = DOMPurify.sanitize(normalizedValue);

    textRef.current = sanitizedValue;
    onChange?.(sanitizedValue);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const targetElement = event.target as HTMLElement; // or HTMLButtonElement, HTMLInputElement, etc.
    if (targetElement) {
      targetElement.innerText = DOMPurify.sanitize(
        event.clipboardData.getData("text/plain")
      );
    }
  };

  return (
    <ContentEditable
      className={cn("content-editable-placeholder overlfow-scroll", className)}
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
