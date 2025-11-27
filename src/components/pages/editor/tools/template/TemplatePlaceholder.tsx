import { EditorTemplate } from "@/data/interfaces/editor/EditorTemplate";
import { cn } from "@/libs/styles/cn";
import React, { FC } from "react";

interface TemplatePlaceholderProps {
  color: string;
  children: React.ReactNode;
}

export const TemplateBubblePlaceholder: FC<TemplatePlaceholderProps> = ({
  color,
  children,
}) => {
  return (
    <div className="relative after:absolute after:content-[''] after:left-[16px] after:bottom-0 after:border-6 after:border-transparent after:mb-[-12px] max-h-[90%]">
      <div
        className={
          "relative gap-1 flex flex-col p-5 border-solid border-4  overflow-scroll max-h-full m-auto after:border-t-inherit"
        }
        style={{
          borderColor: color,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const TemplateVerticalPlaceholder: FC<TemplatePlaceholderProps> = ({
  color,
  children,
}) => {
  return (
    <div
      className="relative py-0.5 px-5 before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-0 before:border-l-[6px] gap-1 flex flex-col before:border-l-inherit"
      style={{
        borderColor: color,
      }}
    >
      {children}
    </div>
  );
};

export const TemplateUnderlinePlaceholder: FC<TemplatePlaceholderProps> = ({
  children,
  color,
}) => {
  return (
    <div
      className={cn(
        "relative border-b py-1 max-h-[90%]",
        "before:absolute before:content-[''] before:bg-[url(/quote.png)] before:bg-no-repeat before:w-4 before:h-4  before:bg-contain before:top-[-16px] before:left-0"
      )}
      style={{
        borderBottomColor: color,
      }}
    >
      <div className="overflow-scroll max-h-full gap-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};

interface TemplatePlaceholderRendererProps {
  children: React.ReactNode;
  template?: EditorTemplate | null;
}

export const TemplatePlaceholderRenderer: FC<
  TemplatePlaceholderRendererProps
> = ({ template, children }) => {
  if (!template) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  switch (template.type) {
    case "Bubble":
      return (
        <TemplateBubblePlaceholder color={template.color}>
          {children}
        </TemplateBubblePlaceholder>
      );

    case "Underline":
      return (
        <TemplateUnderlinePlaceholder color={template.color}>
          {children}
        </TemplateUnderlinePlaceholder>
      );

    case "Vertical":
      return (
        <TemplateVerticalPlaceholder color={template.color}>
          {children}
        </TemplateVerticalPlaceholder>
      );

    default:
      return <React.Fragment>{children}</React.Fragment>;
  }
};
