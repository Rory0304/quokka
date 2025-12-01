import Image from "next/image";

import React, { FC } from "react";

interface HomeQuoteCardListPlaceholderProps {
  searchKey?: string;
}

export const HomeQuoteCardListPlaceholder: FC<
  HomeQuoteCardListPlaceholderProps
> = ({ searchKey }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-6">
      <Image src="/quokka.png" width={120} height={120} alt="" />
      <div className="flex flex-col gap-6 justify-center items-center">
        <div>
          <h2 className="text-foreground text-center mb-1">
            {searchKey ? `'${searchKey}'` : ""} 관련된 검색 결과가 없습니다.
          </h2>
        </div>
      </div>
    </div>
  );
};
