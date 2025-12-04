import React, { FC } from "react";
import { EditorActions } from "./EditorActions";
import { EditorTitleInput } from "./EditorTitleInput";
import { CaretLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { RouteConfig } from "@/data/constants/route";

export const EditorNavigation: FC = () => {
  return (
    <div className="fixed z-10 w-full h-16 max-h-16">
      <div className="mx-auto bg-white border-b border-gray-300 px-4 flex items-center justify-between h-full">
        <div className="flex items-center gap-2">
          <Link href={RouteConfig.my} aria-label="back to my page">
            <CaretLeftIcon width={24} height={24} />
          </Link>
          <EditorTitleInput />
        </div>
        <EditorActions />
      </div>
    </div>
  );
};
