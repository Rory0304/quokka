import React, { FC } from "react";
import { Switch as RadixSwitch } from "radix-ui";

interface SwitchProps {
  id: string;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch: FC<SwitchProps> = ({ id, checked, onCheckedChange }) => {
  return (
    <RadixSwitch.Root
      className="relative h-[25px] w-[42px] rounded-full bg-gray-300 outline-none data-[state=checked]:bg-blue-500"
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
    >
      <RadixSwitch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white shadow-xl transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
    </RadixSwitch.Root>
  );
};
