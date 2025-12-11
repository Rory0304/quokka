import React, { FC } from 'react';

import { Button } from '@/components/blocks/button/Button';
import { RouteConfig } from '@/data/constants/route';
import Image from 'next/image';
import Link from 'next/link';

export const MyQuoteCardListPlaceholder: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-6">
      <Image src="/quokka.png" width={120} height={120} alt="" />
      <div className="flex flex-col gap-6 justify-center items-center">
        <div>
          <h2 className="text-foreground text-center mb-1">
            앗, 아직 생성된 인용 카드가 없어요.
          </h2>
          <p className="text-foreground text-center">지금 생성하러 가볼까요?</p>
        </div>

        <Button asChild>
          <Link href={RouteConfig.editor}>
            <span className="text-white">인용 카드 생성하기</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};
