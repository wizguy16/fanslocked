import { NextResponse } from "next/server";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const email =
    typeof body === "object" &&
    body !== null &&
    "email" in body &&
    typeof (body as { email: unknown }).email === "string"
      ? (body as { email: string }).email.trim()
      : "";
  if (!emailOk(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  // Wire to Resend / Loops / Supabase in production.
  if (process.env.NODE_ENV === "development") {
    console.info("[newsletter signup]", email);
  }
  return NextResponse.json({ ok: true });
}
