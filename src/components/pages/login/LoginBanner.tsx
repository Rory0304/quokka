import Image from "next/image";
import React, { FC } from "react";

export const LoginBanner: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 pb-12">
      <Image
        src="/quokka_logo.png"
        alt="quokkalogo"
        width={80}
        height={80}
        quality={100}
      />
      <p className="text-secondary font-medium text-sm">
        기억하고 싶은 대사를 나만의 카드로,{" "}
        <span className="font-bold">Quokka</span>
      </p>
    </div>
  );
};
