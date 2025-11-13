import {
  RouteConfig,
  RouteConfigKeys,
} from "@/data/constants/route/RouteConfig";

import { CaretLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { FC } from "react";

interface NavigationHeaderProps {
  RightSlot?: React.ReactNode | null;
  backTo?: RouteConfigKeys;
}

export const NavigationHeader: FC<NavigationHeaderProps> = ({
  RightSlot,
  backTo = "home",
}) => {
  return (
    <div className="fixed z-10 w-full h-16 max-h-16">
      <div className="max-w-xl mx-auto bg-white bg-opacity-70 backdrop-blur px-4 flex items-center justify-between h-full">
        <Link href={RouteConfig[backTo]} aria-label={`back to ${backTo}`}>
          <CaretLeftIcon width={32} height={32} />
        </Link>
        {RightSlot}
      </div>
    </div>
  );
};
