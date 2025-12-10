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
              <button aria-label="Profile Menu" className="outline-none">
                <div className="flex gap-1 items-center p-2 hover:bg-slate-50 transition-colors ease-in-out duration-100 rounded-md bg-white border border-gray-300">
                  <Avatar.Root>
                    <Avatar.Fallback className="flex items-center justify-center">
                      <div className="bg-linear-to-r from-green-400 to-blue-500 rounded-full w-6 h-6 flex items-center justify-center mr-2">
                        <span className="text-white text-xs font-bold">
                          {session.user.name?.slice(0, 1)}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-muted-foreground">
                        {session.user.email?.split("@")[0]}
                      </p>
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <CaretDownIcon
                    width={24}
                    height={24}
                    className="text-muted-foreground"
                  />
                </div>
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                className="bg-white outline-none cursor-pointer rounded-md p-1.5 shadow-2xl border border-gray-100 z-1000"
                sideOffset={4}
              >
                <DropdownMenu.Item className="group relative flex select-none items-center rounded-[3px] leading-none hover:outline-none hover:bg-gray-50 ">
                  <button
                    type="button"
                    className="flex items-center gap-2 py-2 px-2 cursor-pointer"
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
