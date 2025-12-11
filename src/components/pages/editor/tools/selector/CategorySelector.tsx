import React, { FC, useRef } from 'react';

import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { Select } from 'radix-ui';

const categoryItems = [
  {
    value: 'movie',
    label: '영화',
  },
  {
    value: 'book',
    label: '책',
  },
  {
    value: 'etc',
    label: '기타',
  },
];

interface CategorySelectorProps {
  category: string;
  onValueChange: (value: string) => void;
}

export const CategorySelector: FC<CategorySelectorProps> = ({
  category,
  onValueChange,
}) => {
  const selectorRef = useRef(null);

  return (
    <div className="relative mb-8 flex items-center z-20" ref={selectorRef}>
      <p className="pr-4 text-sm font-medium leading-none text-foreground">
        카테고리
      </p>

      <Select.Root value={category} onValueChange={onValueChange}>
        <Select.Trigger
          aria-label="Category"
          className="flex items-center gap-2 bg-white outline-none"
        >
          <Select.Value placeholder={category} />
          <Select.Icon className="text-sm">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal container={selectorRef.current}>
          <Select.Content className="overflow-hidden z-20 rounded-md bg-white shadow-xl border border-gray-50">
            <Select.Viewport className="p-2">
              <Select.Group>
                {categoryItems.map(item => (
                  <SelectItem
                    label={item.label}
                    value={item.value}
                    key={item.value}
                  />
                ))}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

const SelectItem: FC<{ value: string; label: string }> = ({ value, label }) => {
  return (
    <Select.Item
      value={value}
      className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md p-1 outline-none"
    >
      <Select.ItemText>
        <p className="text-md">{label}</p>
      </Select.ItemText>
      <Select.ItemIndicator className="inline-flex items-center justify-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
};

SelectItem.displayName = 'SelectItem';
