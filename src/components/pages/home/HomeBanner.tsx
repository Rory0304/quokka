import Image from "next/image";
import React, { FC } from "react";

export const HomeBanner: FC = () => {
  return (
    <div className="bg-[#e6d6ca] min-h-[180px] relative flex items-center gap-10 px-8">
      <Image src="/quokka.png" width={100} height={100} alt="logo" />
      <div className="flex flex-col">
        <p className="text-[#000000] font-semibold text-sm mb-2">
          Quote + Card = Quokka ⭐
        </p>
        <h3 className="text-[#e9631a] mb-3 font-bold text-4xl">Quokka</h3>
        <p className="text-[#000000]">기억하고 싶은 대사를 나만의 카드로</p>
      </div>
    </div>
  );
};
