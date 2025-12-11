'use client';

import { FC } from 'react';

import { RouteConfig } from '@/data/constants/route';
import { useAuth } from '@/hooks/auth';
import { CaretLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { EditorActions } from './EditorActions';
import { EditorTitleInput } from './EditorTitleInput';

export const EditorNavigation: FC = () => {
  const { status } = useAuth();

  return (
    <div className="fixed z-10 w-full h-16 max-h-16">
      <div className="mx-auto bg-white border-b border-gray-300 px-4 flex items-center justify-between h-full">
        <div className="flex items-center gap-2">
          <Link
            href={
              status === 'authenticated' ? RouteConfig.my : RouteConfig.home
            }
            aria-label="back to my page"
          >
            <CaretLeftIcon width={24} height={24} />
          </Link>
          <EditorTitleInput />
        </div>
        <EditorActions />
      </div>
    </div>
  );
};
