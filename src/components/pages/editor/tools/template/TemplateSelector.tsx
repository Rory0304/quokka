import { Template } from "@/data/constants/editor";
import {
  TemplateMap,
  type TemplateType,
} from "@/data/constants/editor/Template";
import React, { FC } from "react";
import { Sheet } from "../sheet";
import {
  ChatBubbleIcon,
  DividerVerticalIcon,
  QuoteIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import { useEditor } from "@/hooks/editor/useEditor";
import { TemplateColorSelcetor } from "./TemplateColorSelcetor";

export const TemplateSelector: FC = () => {
  const { dispatch, editorTemplate } = useEditor();

  const handleClick = (template: TemplateType | null) => {
    dispatch({
      type: "UPDATE_TEMPLATE",
      payload: {
        template: {
          type: template,
        },
      },
    });
  };

  return (
    <Sheet.ItemContainer>
      <Sheet.ItemTitle title="템플릿 설정" />
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => handleClick(null)}
        >
          <div
            className="rounded-md bg-[#f1f1f1] flex flex-col gap-2 p-3 justify-center items-center border border-[#f1f1f1] text-muted-foreground"
            style={{
              backgroundColor: !editorTemplate ? "#f1f1f1" : "transparent",
            }}
          >
            <Cross1Icon />
            <p className="text-xs font-medium ">적용 안 함</p>
          </div>
        </button>
        {(Object.keys(Template) as TemplateType[]).map((item) => (
          <TemplateSelectorItem
            key={item}
            active={editorTemplate?.type === item}
            template={item}
            onClick={() => handleClick(item)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2 relative">
        <Sheet.ItemTitle title="템플릿 색상" />
        <TemplateColorSelcetor />
      </div>
    </Sheet.ItemContainer>
  );
};

interface TemplateSelectorItemProps {
  template: TemplateType;
  active: boolean;
  onClick: () => void;
}

const TemplateSelectIconMap: Record<TemplateType, React.ReactNode> = {
  Bubble: <ChatBubbleIcon />,
  Underline: <QuoteIcon />,
  Vertical: <DividerVerticalIcon />,
};

const TemplateSelectorItem: FC<TemplateSelectorItemProps> = ({
  template,
  active,
  onClick,
}) => {
  return (
    <button type="button" onClick={onClick} className="cursor-pointer">
      <div
        className="rounded-md bg-[#f1f1f1] border border-[#f1f1f1] flex flex-col gap-2 p-3 justify-center items-center text-muted-foreground"
        style={{
          backgroundColor: active ? "#f1f1f1" : "transparent",
        }}
      >
        {TemplateSelectIconMap[template]}
        <p className="text-xs font-mediu">{TemplateMap[template].label}</p>
      </div>
    </button>
  );
};
