import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/libs/prisma/prisma";
import { authOptions } from "@/libs/auth/auth";
import { getServerSession } from "next-auth/next";

import { Prisma } from "@prisma/client";

import zod from "zod";
import { QuoteCardCategory } from "@/data/constants/quoteCard/QuoteCardCategory";

const querySchema = zod.object({
  cursor: zod.string().optional(),
  limit: zod.string().transform(Number).optional(),
  sort: zod.enum(["asc", "desc"]).optional(),
  category: zod.enum(QuoteCardCategory).optional(),
  searchKey: zod.string().optional(),
});

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());
    const safeParams = querySchema.safeParse(params);

    if (!safeParams.success) {
      return NextResponse.json(
        { error: safeParams.error.issues },
        { status: 400 }
      );
    }

    const { limit, sort, cursor, category, searchKey } = safeParams.data;

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const query: Prisma.QuoteCardFindManyArgs = {
      where: {
        isPublic: true,
      },
      orderBy: { createdAt: sort },
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    };

    // 카테고리 및 검색어 필터링 설정
    if (category || searchKey || cursor) {
      const whereConditions: Prisma.QuoteCardWhereInput = {};

      if (category) {
        whereConditions.category = category;
      }

      // 검색어로 title 또는 tags에서 검색
      if (searchKey && searchKey.trim()) {
        whereConditions.OR = [
          {
            title: {
              contains: searchKey.trim(),
              mode: "insensitive",
            },
          },
          {
            tags: {
              has: searchKey.trim(),
            },
          },
        ];
      }

      query.where = whereConditions;
    }

    if (cursor) {
      query.skip = 1;
      query.cursor = { id: cursor };
    }

    const quoteCards = await prisma.quoteCard.findMany(query);

    // credential의 userId를 활용하여 북마크 상태 확인
    let quoteCardsWithBookmark = quoteCards;

    if (userId && quoteCards.length > 0) {
      // 인증된 사용자인 경우: 해당 사용자의 북마크 상태 조회
      const quoteCardIds = quoteCards.map((card) => card.id);

      const bookmarks = await prisma.bookmark.findMany({
        where: {
          userId,
          quoteCardId: { in: quoteCardIds },
        },
        select: {
          quoteCardId: true,
        },
      });

      const bookmarkedIds = new Set(bookmarks.map((b) => b.quoteCardId));

      quoteCardsWithBookmark = quoteCards.map((card) => ({
        ...card,
        isBookmarked: bookmarkedIds.has(card.id),
      }));
    } else {
      // 인증되지 않은 사용자 또는 빈 리스트인 경우: isBookmarked를 false로 설정
      quoteCardsWithBookmark = quoteCards.map((card) => ({
        ...card,
        isBookmarked: false,
      }));
    }

    const hasNextPage = quoteCards.length > (limit ?? 0);
    const nextCursor = hasNextPage
      ? quoteCards[quoteCards.length - 1]?.id ?? null
      : null;

    return NextResponse.json({
      data: quoteCardsWithBookmark,
      pagination: {
        limit,
        nextCursor,
        hasNextPage,
      },
    });
  } catch (error) {
    console.error("Error fetching QuoteCards:", error);

    return NextResponse.json(
      { error: "Failed to fetch QuoteCards" },
      { status: 500 }
    );
  }
};
