import React, { FC } from 'react';

import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Select as RadixSelect } from 'radix-ui';

import { SelectItem } from './SelectItem';

interface SelectProps {
  value: string;
  label: string;
  items: {
    label: string;
    value: string;
  }[];
  onValueChange: (value: string) => void;
}

export const Select: FC<SelectProps> = ({
  value,
  items,
  label,
  onValueChange,
}) => {
  return (
    <div className="flex items-center gap-4">
      <p className="text-sm font-medium leading-none text-foreground pr-4">
        {label}
      </p>

      <RadixSelect.Root value={value} onValueChange={onValueChange}>
        <RadixSelect.Trigger
          aria-label="Font Family"
          className="flex items-center gap-2 bg-white outline-none"
        >
          <RadixSelect.Value placeholder={value} />
          <RadixSelect.Icon className="text-sm">
            <ChevronDownIcon />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content className="overflow-hidden rounded-md bg-white shadow-xl border border-gray-50">
            <RadixSelect.Viewport className="p-2">
              <RadixSelect.Group>
                {items.map(item => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    label={item.label}
                  />
                ))}
              </RadixSelect.Group>
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  );
};
