"use client";

import { RouteConfig } from "@/data/constants/route";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
import { DefaultHeader } from "./DefaultHeader";
import { NavigationHeader } from "./NavigationHeader";

const NavigationHeaderPathname = [RouteConfig.login, RouteConfig.register];

const GlobalHeaderHiddenPathname: string[] = [RouteConfig.editor];

export const GlobalHeader: FC = () => {
  const pathname = usePathname();
  const isHeaderHidden = GlobalHeaderHiddenPathname.includes(pathname);
  const isNavigation = NavigationHeaderPathname.includes(pathname);

  const renderContent = () => {
    if (isHeaderHidden) return null;

    if (isNavigation) return <NavigationHeader />;

    return <DefaultHeader />;
  };

  return <div className="bg-white fixed z-10 w-full">{renderContent()}</div>;
};
