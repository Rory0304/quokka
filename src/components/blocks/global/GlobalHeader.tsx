import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

export const GlobalHeader: FC = () => {
  return (
    <div className="fixed z-10 w-full h-16 max-h-16">
      <div className="max-w-xl mx-auto bg-[#fcf6f6] bg-opacity-70 backdrop-blur px-4 flex items-center justify-between h-full">
        <Link href="/">
          <Image
            src="/quokka_logo.png"
            alt="quokkalogo"
            width={30}
            height={30}
          />
        </Link>
        <div>
          <Link href="/">
            <span className="font-semibold">로그인</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
