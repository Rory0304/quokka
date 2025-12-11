import React, { FC } from 'react';

import { cn } from '@/libs/styles/cn';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export const HomeFloatingButton: FC = () => {
  return (
    <div className="w-full fixed left-0 bottom-8">
      <div className="flex justify-center">
        <Link href="/editor">
          <div
            className={cn(
              'border-primary border bg-[#e9631ad8] rounded-lg p-3 shadow-xl flex items-center gap-2',
              'hover:scale-110 transition-all duration-150'
            )}
          >
            <span className="text-white text-sm font-semibold">
              나만의 인용 카드 만들기
            </span>
            <ArrowRightIcon color="white" width={20} height={20} />
          </div>
        </Link>
      </div>
    </div>
  );
};
