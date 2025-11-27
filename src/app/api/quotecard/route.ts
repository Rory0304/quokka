import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma/prisma";

import { Prisma } from "@prisma/client";
import { withAuthHandler } from "@/middlewares/withAuthHandler";
import zod from "zod";
import { QuoteCardUpdateRequest } from "@/data/interfaces/request/quotecard/QuoteCardUpdateRequest";
import { QuoteCardCreateRequest } from "@/data/interfaces/request/quotecard/QuoteCardCreateRequest";

const querySchema = zod.object({
  id: zod.string(),
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

    const { id } = safeParams.data;

    const query: Prisma.QuoteCardFindUniqueArgs = {
      where: { userId: sessionCtx.userId, id },
    };

    const quoteCard = await prisma.quoteCard.findUnique(query);

    return NextResponse.json({
      data: quoteCard,
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

export const PATCH = withAuthHandler(async ({ request }) => {
  try {
    const body = await request.json();
    const { id, isPublic } = body as QuoteCardUpdateRequest;

    const quoteCard = await prisma.quoteCard.update({
      where: {
        id,
      },
      data: {
        isPublic,
      },
    });

    return NextResponse.json(
      {
        id: quoteCard.id,
        customFields: quoteCard.customFields,
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
