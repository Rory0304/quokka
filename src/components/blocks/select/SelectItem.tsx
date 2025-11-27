import { CheckIcon } from "@radix-ui/react-icons";
import { Select } from "radix-ui";
import { FC } from "react";

interface SelectItemProps {
  value: string;
  label: string;
}

export const SelectItem: FC<SelectItemProps> = ({ value, label }) => {
  return (
    <Select.Item
      value={value}
      className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-1 outline-none"
    >
      <Select.ItemText>
        <p className="text-sm">{label}</p>
      </Select.ItemText>
      <Select.ItemIndicator className="inline-flex w-[25px] items-center justify-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
};
