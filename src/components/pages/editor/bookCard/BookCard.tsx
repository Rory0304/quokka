import { useEditor } from "@/hooks/editor/useEditor";
import { cn } from "@/libs/styles/cn";
import React, { FC } from "react";
import { TextInput } from "../tools/TextInput";
import { FontSizeMap } from "@/data/constants/editor/FontSize";

const CONTENT_PLACEHOLDER = "내용을 입력해주세요";
const AUTHOR_PLACEHOLDER = "저자 또는 출처";

export const BookCard: FC = () => {
  const {
    state: { backgroundColor, fontSize, textAlign },
    dispatch,
  } = useEditor();

  return (
    <div className={cn("w-full bg-gray-100")}>
      <div
        className="mx-auto p-4 transition-all duration-300 ease-in-out"
        style={{
          width: "60%",
          height: "auto",
          aspectRatio: 1,
          background: backgroundColor.bgColor,
        }}
      >
        <div className="flex justify-center h-full flex-col">
          <TextInput
            placeholder={CONTENT_PLACEHOLDER}
            fontSize={FontSizeMap[fontSize].size}
            textAlign={textAlign}
            onChange={(value) =>
              dispatch({
                type: "CHANGE_CONTENT",
                payload: { content: value },
              })
            }
          />
          <TextInput
            fontSize={FontSizeMap[fontSize].size}
            textAlign={textAlign}
            placeholder={AUTHOR_PLACEHOLDER}
          />
        </div>
      </div>
    </div>
  );
};
