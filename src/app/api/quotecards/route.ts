import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/libs/prisma/prisma";
import { authOptions } from "@/libs/auth/auth";
import { getServerSession } from "next-auth/next";

import { Prisma } from "@prisma/client";

import zod from "zod";
import { QuoteCardCategory } from "@/data/constants/quoteCard/QuoteCardCategory";

const querySchema = zod.object({
  cursor: zod.string().optional(),
  limit: zod.string().transform(Number),
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
      take: limit + 1,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },

        ...(userId && {
          _count: { select: { bookmarks: { where: { userId } } } },
        }),
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

    const quoteCardsWithBookmark = quoteCards.map((quote) => {
      const cardWithCount = quote as typeof quote & {
        _count?: { bookmarks: number };
      };

      const { _count, ...cardData } = cardWithCount;

      return {
        ...cardData,
        isBookmarked: Boolean(_count?.bookmarks),
      };
    });

    const hasNextPage = quoteCards.length > limit;
    const data = hasNextPage
      ? quoteCardsWithBookmark.slice(0, limit)
      : quoteCardsWithBookmark;

    const nextCursor = hasNextPage
      ? data.length > 0
        ? data[data.length - 1]?.id ?? null
        : null
      : null;

    return NextResponse.json({
      data,
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
