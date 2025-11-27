import { CSSProperties, FC } from "react";

interface SelectorItemProps {
  label: string;
  active: boolean;
  onClick: () => void;
  styles?: CSSProperties;
}

export const SelectorItem: FC<SelectorItemProps> = ({
  label,
  active,
  onClick,
  styles,
}) => {
  return (
    <button type="button" onClick={onClick} className="cursor-pointer">
      <span
        className="rounded-md p-2 text-sm font-medium"
        style={{
          ...styles,
          backgroundColor: active ? "#f1f1f1" : "transparent",
        }}
      >
        {label}
      </span>
    </button>
  );
};
