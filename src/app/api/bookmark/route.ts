import { prisma } from '@/libs/prisma/prisma';
import { withAuthHandler } from '@/middlewares/withAuthHandler';
import { NextResponse } from 'next/server';
import zod from 'zod';

const bodySchema = zod.object({
  quoteCardId: zod.string(),
});

export const POST = withAuthHandler(async ({ request, sessionCtx }) => {
  try {
    const body = await request.json();
    const safeBody = bodySchema.safeParse(body);

    if (!safeBody.success) {
      return NextResponse.json(
        { error: safeBody.error.issues },
        { status: 400 }
      );
    }

    const { quoteCardId } = safeBody.data;

    // QuoteCard 존재 확인
    const quoteCard = await prisma.quoteCard.findUnique({
      where: { id: quoteCardId },
    });

    if (!quoteCard) {
      return NextResponse.json(
        { error: 'QuoteCard not found' },
        { status: 404 }
      );
    }

    // 이미 북마크되어 있는지 확인
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_quoteCardId: {
          userId: sessionCtx.userId,
          quoteCardId,
        },
      },
    });

    if (existingBookmark) {
      return NextResponse.json(
        { error: 'Bookmark already exists' },
        { status: 409 }
      );
    }

    // 북마크 생성
    const bookmark = await prisma.bookmark.create({
      data: {
        userId: sessionCtx.userId,
        quoteCardId,
      },
    });

    return NextResponse.json(
      {
        id: bookmark.id,
        message: 'Bookmark created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating bookmark:', error);

    return NextResponse.json(
      { error: 'Failed to create bookmark' },
      { status: 500 }
    );
  }
});

export const DELETE = withAuthHandler(async ({ request, sessionCtx }) => {
  try {
    const body = await request.json();
    const safeBody = bodySchema.safeParse(body);

    if (!safeBody.success) {
      return NextResponse.json(
        { error: safeBody.error.issues },
        { status: 400 }
      );
    }

    const { quoteCardId } = safeBody.data;

    // 북마크 존재 확인 및 삭제
    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_quoteCardId: {
          userId: sessionCtx.userId,
          quoteCardId,
        },
      },
    });

    if (!bookmark) {
      return NextResponse.json(
        { error: 'Bookmark not found' },
        { status: 404 }
      );
    }

    await prisma.bookmark.delete({
      where: {
        id: bookmark.id,
      },
    });

    return NextResponse.json(
      {
        message: 'Bookmark deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting bookmark:', error);

    return NextResponse.json(
      { error: 'Failed to delete bookmark' },
      { status: 500 }
    );
  }
});

const querySchema = zod.object({
  quoteCardId: zod.string().optional(),
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

    const { quoteCardId } = safeParams.data;

    // 특정 QuoteCard의 북마크 상태 확인
    if (quoteCardId) {
      const bookmark = await prisma.bookmark.findUnique({
        where: {
          userId_quoteCardId: {
            userId: sessionCtx.userId,
            quoteCardId,
          },
        },
      });

      return NextResponse.json({
        data: {
          isBookmarked: !!bookmark,
          bookmarkId: bookmark?.id || null,
        },
      });
    }

    // 사용자의 모든 북마크 목록 조회
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: sessionCtx.userId,
      },
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      data: bookmarks,
    });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);

    return NextResponse.json(
      { error: 'Failed to fetch bookmarks' },
      { status: 500 }
    );
  }
});
