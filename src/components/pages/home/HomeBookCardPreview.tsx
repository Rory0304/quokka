import Link from "next/link";
import React, { FC } from "react";

export const HomeBookCardPreview: FC = () => {
  return (
    <div className="py-12">
      <h3 className="text-center text-2xl font-semibold mb-4">
        인용 카드 미리보기
      </h3>
      <div
        className="w-1/2 h-auto aspect-square bg-no-repeat mx-auto"
        style={{
          background: "url(/preview_image.jpg)",
        }}
      >
        <p>
          세상을 보고, 무수한 장애물을 넘어, 벽을 허물고 더 가까이 다가가,
          서로를 알아가고 느끼는 것. 그것이 바로 인생(LIFE)의 목적이다
        </p>
      </div>

      <div className="flex justify-center py-4">
        <Link href="/editor">
          <div className="bg-amber-600 rounded-md p-3 cursor-pointer hover:bg-amber-700 transition-colors duration-150">
            <span className="text-white font-semibold">
              나만의 인용 카드 만들기
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};
