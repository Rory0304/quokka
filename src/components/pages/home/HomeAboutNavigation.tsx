import React, { FC } from 'react';

import { RouteConfig } from '@/data/constants/route';
import Link from 'next/link';

export const HomeAboutNavigation: FC = () => {
  return (
    <div className="flex justify-center items-center">
      <Link href={RouteConfig.about}>
        <p className="text-xs text-muted-foreground">
          About <span className="text-primary font-medium">Quokka</span>
        </p>
      </Link>
    </div>
  );
};
