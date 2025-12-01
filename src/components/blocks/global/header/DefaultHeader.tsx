"use client";

import { CaretDownIcon, ExitIcon } from "@radix-ui/react-icons";
import { signOut, useSession } from "next-auth/react";

import Link from "next/link";
import { Avatar, DropdownMenu } from "radix-ui";

import React, { FC } from "react";

import { SearchViewToggle } from "./parts/SearchViewToggle";
import { GoogleLoginButton } from "@/components/pages/login/GoogleLoginButton";

export const DefaultHeader: FC = () => {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const renderMainLogoArea = () => {
    return (
      <Link href="/">
        <div className="flex gap-2">
          <h1 className="text-primary font-bold text-lg">Quokka</h1>
        </div>
      </Link>
    );
  };

  return (
    <div className="max-w-7xl h-16 max-h-16 mx-auto border-b border-gray-100 bg-white bg-opacity-70 backdrop-blur px-4 flex items-center justify-between">
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
          <GoogleLoginButton />
        )}
      </div>
    </div>
  );
};
