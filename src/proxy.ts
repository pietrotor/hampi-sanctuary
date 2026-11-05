import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE = "hampi-hero-story";
/** Keep in step with `heroStories` in src/lib/media.ts. */
const STORIES = 5;

function nextStory(raw: string | undefined): number {
  const stored = raw === undefined ? Number.NaN : Number(raw);
  if (!Number.isInteger(stored) || stored < 0 || stored >= STORIES) {
    return Math.floor(Math.random() * STORIES);
  }
  return (stored + 1) % STORIES;
}

export function proxy(request: NextRequest) {
  const index = nextStory(request.cookies.get(COOKIE)?.value);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-hero-story", String(index));

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.cookies.set(COOKIE, String(index), {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: "/",
};
