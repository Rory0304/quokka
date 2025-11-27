import { useEditor } from "@/hooks/editor/useEditor";
import React, { FC, useState } from "react";

import { FontSizeIcon } from "@radix-ui/react-icons";
import { EditorElement } from "@/components/pages/editor/contexts/context";

interface FontSizeSelectorProps {
  element: EditorElement;
}

export const FontSizeSelector: FC<FontSizeSelectorProps> = ({ element }) => {
  const { dispatch } = useEditor();

  const { fontSize } = element.content;
  const [inputValue, setInputValue] = useState(String(fontSize || 16));

  // Sync inputValue when fontSize changes externally
  React.useEffect(() => {
    setInputValue(String(fontSize || 16));
  }, [fontSize]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Only dispatch if it's a valid number
    if (value === "" || value === "-") {
      return;
    }

    const numberValue = Number(value);
    if (!isNaN(numberValue) && numberValue > 0) {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          element: {
            ...element,
            content: {
              ...element.content,
              fontSize: numberValue,
            },
          },
        },
      });
    }
  };

  return (
    <div className="flex items-center gap-2 py-4 px-4">
      <FontSizeIcon />
      <input
        type="number"
        min="1"
        value={inputValue}
        onChange={handleInputChange}
        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
        title="숫자로 입력해주세요"
      />
      <span>px</span>
    </div>
  );
};
