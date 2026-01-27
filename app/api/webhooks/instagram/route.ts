import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const id: string = request.nextUrl.searchParams.get("hub.challenge") || "";
  const response = new NextResponse(id);

  return response;
}
