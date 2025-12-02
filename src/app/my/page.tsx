"use client";

import { ErrorAlert } from "@/components/blocks/alert/ErrorAlert";
import { AsyncBoundary } from "@/components/blocks/asyncBoundary/AsyncBoundary";
import { GlobalLayout } from "@/components/blocks/global";
import { MyQuoteCardList } from "@/components/pages/my/MyQuoteCardList";
import { useAuth } from "@/hooks/auth";

export default function MyPage() {
  const { isLogin } = useAuth();

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
      <AsyncBoundary
        pendingFallback={<div>Loading...</div>}
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
    </GlobalLayout>
  );
}
