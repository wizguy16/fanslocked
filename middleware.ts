import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function adminUnauthorized(): NextResponse {
  return new NextResponse(null, { status: 404 });
}

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  const secret = process.env.ADMIN_ROUTE_SECRET?.trim();
  if (!secret) {
    return adminUnauthorized();
  }

  const key = request.nextUrl.searchParams.get("key");
  if (key !== secret) {
    return adminUnauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
