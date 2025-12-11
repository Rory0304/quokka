import React, { FC } from 'react';

import {
  RouteConfig,
  RouteConfigKeys,
} from '@/data/constants/route/RouteConfig';
import { CaretLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

interface NavigationHeaderProps {
  backTo?: RouteConfigKeys;
}

export const NavigationHeader: FC<NavigationHeaderProps> = ({
  backTo = 'home',
}) => {
  return (
    <div className="max-w-7xl h-16 max-h-16 mx-auto bg-white bg-opacity-70 backdrop-blur px-4 flex items-center justify-between">
      <Link href={RouteConfig[backTo]} aria-label={`back to ${backTo}`}>
        <CaretLeftIcon width={32} height={32} />
      </Link>
    </div>
  );
};
