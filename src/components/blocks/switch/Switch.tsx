import React, { FC } from "react";
import { Switch as RadixSwitch } from "radix-ui";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/libs/styles/cn";

interface SwitchProps {
  id: string;
  label: string;
  checked: boolean;
  className?: ClassNameValue;
}

export const Switch: FC<SwitchProps> = ({ id, label, checked, className }) => {
  return (
    <form>
      <div className={cn("flex items-center", className)}>
        <label
          className="pr-4 text-sm font-medium leading-none text-foreground"
          htmlFor={id}
        >
          {label}
        </label>
        <RadixSwitch.Root
          className="relative h-[25px] w-[42px] rounded-full bg-gray-300 outline-none data-[state=checked]:bg-blue-500"
          id={id}
          checked={checked}
        >
          <RadixSwitch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white shadow-xl transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </RadixSwitch.Root>
      </div>
    </form>
  );
};
