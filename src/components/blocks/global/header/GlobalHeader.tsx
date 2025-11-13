"use client";
import { RouteConfig } from "@/data/constants/route";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
import { DefaultHeader } from "./DefaultHeader";
import { NavigationHeader } from "./NavigationHeader";
import { useGlobalHeader } from "@/store/header/useGlobalHeader";

const NavigationHeaderPathname = [
  RouteConfig.login,
  RouteConfig.register,
  RouteConfig.editor,
];

const GlobalHeaderHiddenPathname: string[] = [];

export const GlobalHeader: FC = () => {
  const pathname = usePathname();
  const isHeaderHidden = GlobalHeaderHiddenPathname.includes(pathname);
  const isNavigation = NavigationHeaderPathname.includes(pathname);

  const { RightSlot } = useGlobalHeader();

  if (isHeaderHidden) return null;

  if (isNavigation) return <NavigationHeader RightSlot={RightSlot} />;

  return <DefaultHeader />;
};
