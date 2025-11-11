import React, { FC, useRef } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface TextInputProps {
  fontSize: string;
  textAlign: string;
  placeholder?: string;
  onChange?: (text: string) => void;
}

export const TextInput: FC<TextInputProps> = (props) => {
  const { fontSize, textAlign, placeholder, onChange } = props;

  const textRef = useRef("");

  const handleChange = (event: ContentEditableEvent) => {
    textRef.current = event.target.value;
    onChange?.(event.target.value);
  };

  return (
    <ContentEditable
      className="content-editable-placeholder"
      style={{ color: "white", marginBottom: "4px", fontSize, textAlign }}
      html={textRef.current}
      disabled={false}
      onChange={handleChange}
      data-placeholder={placeholder}
    />
  );
};
