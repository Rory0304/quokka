"use client";

import { ErrorAlert } from "@/components/blocks/alert/ErrorAlert";
import { AsyncBoundary } from "@/components/blocks/asyncBoundary/AsyncBoundary";
import { GlobalLayout } from "@/components/blocks/global";
import { MyQuoteCardItemLoading } from "@/components/pages/my/MyQuoteCardItemLoading";
import { MyQuoteCardList } from "@/components/pages/my/MyQuoteCardList";
import { RouteConfig } from "@/data/constants/route";
import { useAuth } from "@/hooks/auth";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function MyPage() {
  const { isLogin, status } = useAuth();

  if (status === "loading") {
    return <div></div>;
  }

  if (!isLogin) {
    return (
      <GlobalLayout>
        <div className="flex items-center h-[85vh] justify-center">
          <ErrorAlert
            title="로그인 후 이용 가능합니다"
            description="로그인을 먼저 진행해주세요"
          />
        </div>
      </GlobalLayout>
    );
  }

  return (
    <GlobalLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 group py-12">
        <Link href={RouteConfig.editor}>
          <div className="w-full h-full bg-green-50 flex flex-col justify-center items-center rounded-xl py-6 text-muted-foreground">
            <div className="flex items-center justify-center rounded-full bg-green-300 w-10 h-10 mb-4">
              <PlusIcon className="text-white" width={20} height={20} />
            </div>
            <p className="font-semibold text-sm">인용 카드 생성하기</p>
          </div>
        </Link>

        <AsyncBoundary
          pendingFallback={<MyQuoteCardItemLoading count={5} />}
          errorFallback={({ reset }) => (
            <ErrorAlert
              title="관련 정보를 찾지 못했어요"
              description="잠시후 다시 시도해주세요"
              onReset={reset}
            />
          )}
        >
          <MyQuoteCardList />
        </AsyncBoundary>
      </div>
    </GlobalLayout>
  );
}
