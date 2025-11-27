"use client";

import {
  CaretDownIcon,
  ExitIcon,
  GlobeIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, DropdownMenu } from "radix-ui";

import React, { FC } from "react";
import { Button } from "../../button/Button";
import { usePathname } from "next/navigation";
import { SearchViewToggle } from "./parts/SearchViewToggle";

export const DefaultHeader: FC = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const renderMainLogoArea = () => {
    return (
      <Link href="/">
        <div className="flex gap-2">
          <Image
            src="/quokka_logo.png"
            alt="quokkalogo"
            width={30}
            height={30}
          />
          <h1 className="text-primary font-bold">Qukka</h1>
        </div>
      </Link>
    );
  };

  const renderPrivateModeArea = () => {
    return (
      <div className="bg-gray-100 rounded-md">
        <Button asChild variant="ghost" className="rounded-md">
          <Link href="/my">
            <div className="flex items-center gap-2">
              <PersonIcon />
              <span className="font-medium text-sm  text-muted-foreground">
                나의 목록
              </span>
            </div>
          </Link>
        </Button>
        <Button asChild variant="ghost" className="rounded-md">
          <Link href="/">
            <div className="flex items-center gap-2 text-muted-foreground">
              <GlobeIcon />
              <span className="font-medium text-sm">통합 검색</span>
            </div>
          </Link>
        </Button>
      </div>
    );
  };

  return (
    <div className="w-full bg-white border-b border-gray-100 px-4 flex items-center justify-between h-full">
      <div className="flex items-center gap-6">
        {renderMainLogoArea()}
        <SearchViewToggle />
      </div>
      <div>
        {session ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button aria-label="Profile Menu">
                <div className="flex gap-1 items-center p-2 hover:bg-slate-50 transition-colors ease-in-out duration-100 rounded-3xl">
                  <Avatar.Root className="inline-flex size-[32px] select-none items-center justify-center overflow-hidden rounded-full bg-white border border-black  bg-blackA1 align-middle">
                    <Avatar.Fallback className="leading-1 flex size-full items-center justify-center bg-white text-sm font-medium text-black">
                      PD
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <CaretDownIcon width={24} height={24} />
                </div>
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                className="rounded-md bg-white p-[5px] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
                sideOffset={7}
              >
                <DropdownMenu.Item className="group relative flex select-none items-center rounded-[3px] leading-none outline-none ">
                  <button
                    type="button"
                    className="flex items-center gap-2 py-2 px-2"
                    onClick={handleSignOut}
                  >
                    <ExitIcon className="text-red-500" />
                    <span className="text-red-500">로그아웃</span>
                  </button>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        ) : (
          <Link href="/login">
            <span className="font-semibold">로그인</span>
          </Link>
        )}
      </div>
    </div>
  );
};
