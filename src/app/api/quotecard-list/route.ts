import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma/prisma";

import { Prisma } from "@prisma/client";
import { withAuthHandler } from "@/middlewares/withAuthHandler";
import zod from "zod";

import { QuoteCardCreateRequest } from "@/data/interfaces/request/quotecard/QuoteCardCreateRequest";

const querySchema = zod.object({
  limit: zod.string().transform(Number),
  cursor: zod.string().optional(),
  sort: zod.enum(["asc", "desc"]).optional(),
});

export const GET = withAuthHandler(async ({ request, sessionCtx }) => {
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
      where: { userId: sessionCtx.userId },
      take: limit,
    };

    if (sort) {
      query.orderBy = { createdAt: sort };
    }

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
});

export const POST = withAuthHandler(async ({ request, sessionCtx }) => {
  try {
    const body = await request.json();
    const jsonBody = body as QuoteCardCreateRequest;

    const quoteCard = await prisma.quoteCard.create({
      data: {
        userId: sessionCtx.userId,

        title: jsonBody.title,
        category: jsonBody.category,
        tags: jsonBody.tags,
        isPublic: jsonBody.isPublic,
        customFields: jsonBody.customFields as unknown as Prisma.InputJsonValue,
        thumbnailUrl: jsonBody.thumbnailUrl,
      },
    });

    return NextResponse.json(
      {
        id: quoteCard.id,
        message: "QuoteCard saved successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving QuoteCard:", error);

    return NextResponse.json(
      { error: "Failed to save QuoteCard" },
      { status: 500 }
    );
  }
});
