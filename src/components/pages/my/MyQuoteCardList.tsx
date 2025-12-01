"use client";

import React, { FC } from "react";
import { useMyQuoteCardList } from "@/hooks/quoteCard/useMyQuoteCardList";
import { MyQuoteCardListPlaceholder } from "./MyQuoteCardListPlaceholder";

import Link from "next/link";
import { RouteConfig } from "@/data/constants/route";
import { PlusIcon } from "@radix-ui/react-icons";
import { MyQuoteCardItem } from "./MyQuoteCardItem";
import { useQuoteCardUpdate } from "@/hooks/quoteCard/useQuoteCardUpdate";
import { QuoteCardType } from "@/data/interfaces/quoteCard/QuoteCardType";

export const MyQuoteCardList: FC = () => {
  const { list, isEmpty } = useMyQuoteCardList();
  const updateMutation = useQuoteCardUpdate();

  if (isEmpty) {
    return <MyQuoteCardListPlaceholder />;
  }

  const handleChangePublicStatus = (
    param: Pick<QuoteCardType, "id" | "isPublic">
  ) => {
    updateMutation.mutate({
      body: {
        id: param.id,
        data: {
          isPublic: !param.isPublic,
        },
      },
    });
  };

  return (
    <div className="grid grid-cols-3 gap-10 group pt-12">
      <Link href={RouteConfig.editor}>
        <div className="w-full h-full bg-green-50 flex flex-col justify-center items-center rounded-xl  text-muted-foreground">
          <div className="flex items-center justify-center rounded-full bg-green-300 w-10 h-10 mb-4">
            <PlusIcon className="text-white" width={20} height={20} />
          </div>
          <p className="font-semibold text-sm">인용 카드 생성하기</p>
        </div>
      </Link>

      {list.map((item) => (
        <MyQuoteCardItem
          key={item.id}
          item={item}
          onClickPublicStatus={handleChangePublicStatus}
        />
      ))}
    </div>
  );
};
