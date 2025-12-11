import { prisma } from '@/libs/prisma/prisma';
import { withAuthHandler } from '@/middlewares/withAuthHandler';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import zod from 'zod';

const querySchema = zod.object({
  cursor: zod.string().optional(),
  limit: zod.string().transform(Number),
  sort: zod.enum(['asc', 'desc']).optional(),
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

    const query: Prisma.BookmarkFindManyArgs = {
      where: { userId: sessionCtx.userId },
      take: limit + 1,
      include: {
        quoteCard: {
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
        },
      },
    };

    if (sort) {
      query.orderBy = { createdAt: sort };
    }

    if (cursor) {
      query.skip = 1;
      query.cursor = { id: cursor };
    }

    const bookmarks = await prisma.bookmark.findMany(query);

    const hasNextPage = bookmarks.length > limit;
    const data = hasNextPage ? bookmarks.slice(0, limit) : bookmarks;
    const nextCursor = hasNextPage
      ? data.length > 0
        ? (data[data.length - 1]?.id ?? null)
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
    console.error('Error fetching bookmarks:', error);

    return NextResponse.json(
      { error: 'Failed to fetch bookmarks' },
      { status: 500 }
    );
  }
});
