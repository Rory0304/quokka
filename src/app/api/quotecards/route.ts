import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/libs/prisma/prisma";

import { Prisma } from "@prisma/client";

import zod from "zod";

const querySchema = zod.object({
  cursor: zod.string().optional(),
  limit: zod.string().transform(Number).optional(),
  sort: zod.enum(["asc", "desc"]).optional(),
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

    const { limit, sort, cursor } = safeParams.data;

    const query: Prisma.QuoteCardFindManyArgs = {
      orderBy: { createdAt: sort },
      take: limit,
    };

    if (cursor) {
      query.skip = 1;
      query.cursor = { id: cursor };
    }

    const quoteCards = await prisma.quoteCard.findMany(query);

    const hasNextPage = quoteCards.length > (limit ?? 0);
    const nextCursor = hasNextPage
      ? quoteCards[quoteCards.length - 1]?.id ?? null
      : null;

    return NextResponse.json({
      data: quoteCards,
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
