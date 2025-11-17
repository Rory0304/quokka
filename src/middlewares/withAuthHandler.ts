import { authOptions } from "@/libs/auth/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export type SessionContext = { userId: string };

export async function withSession<T>(
  handler: (ctx: SessionContext) => Promise<T>
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Response("Unauthorized", { status: 401 });
  }

  return handler({ userId: session.user.id });
}

type HandlerFn = ({
  request,
  sessionCtx,
}: {
  request: Request;
  sessionCtx: SessionContext;
}) => Promise<NextResponse>;

export function withAuthHandler(fn: HandlerFn) {
  return async (request: Request) => {
    return withSession(async (sessionCtx) => {
      return fn({ request, sessionCtx });
    });
  };
}
