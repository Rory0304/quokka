'use client';

import React from 'react';

import { GlobalLayout } from '@/components/blocks/global';
import { RouteConfig } from '@/data/constants/route';
import { CaretLeftIcon, MagicWandIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function About() {
  return (
    <GlobalLayout>
      <div className="max-w-4xl mx-auto py-16 px-6">
        {/* Back to Main Navigation */}
        <div className="mb-8">
          <Link
            href={RouteConfig.home}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="back to main"
          >
            <CaretLeftIcon width={20} height={20} />
            <span className="text-sm font-medium">홈으로</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Quokka
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            기억하고 싶은 문장을 나만의 카드로
          </p>
        </div>

        {/* Main Description */}
        <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm mb-12">
          <p className="text-lg text-foreground leading-relaxed mb-6">
            Quokka는 의미있는 문장을 나만의 카드로 만들어 저장하고 공유할 수
            있는 서비스입니다.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            책에서 읽은 감동적인 문장, 강연에서 들은 영감을 주는 한 마디,
            일상에서 만난 의미 있는 문구들을 나만의 스타일로 디자인하여 카드로
            만들고 관리해보세요.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              커스텀 디자인
            </h3>
            <p className="text-sm text-muted-foreground">
              다양한 템플릿과 도구로 나만의 스타일의 인용 카드를 만들어보세요.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              쉽게 관리
            </h3>
            <p className="text-sm text-muted-foreground">
              카테고리와 태그로 내 카드들을 체계적으로 정리하고 관리할 수
              있습니다.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              공유하기
            </h3>
            <p className="text-sm text-muted-foreground">
              만든 카드를 공개하여 다른 사람들과 영감을 나눌 수 있습니다.
            </p>
          </div>
        </div>

        {/* Comming Soon */}
        <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm">
          <h2 className="font-bold text-primary mb-4">Coming Soon</h2>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center text-muted-foreground">
              <MagicWandIcon />
              <p>더 다양한 텍스트 커스터마이징 툴</p>
            </div>

            <div className="flex gap-4 items-center text-muted-foreground">
              <MagicWandIcon />
              <p>카테고리 분류 기능</p>
            </div>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
