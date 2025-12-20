import { NextRequest, NextResponse } from "next/server";
import { del, head, put } from "@vercel/blob";

export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.formData();

  const file = body.get("image") as File;

  const { url } = await put(`media/${file.name}`, file, {
    access: "public",
    allowOverwrite: true,
    addRandomSuffix:true
  });

  const response = new NextResponse(url);

  response.headers.set("Content-Type", "text/plain");

  return response;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const load: string =
    request.nextUrl.searchParams.get("load") ||
    request.nextUrl.searchParams.get("fetch") ||
    "";

  const result = await fetch(load);
  const blob = await result.blob();

  const response = new NextResponse(blob);

  if (load.includes(request.headers.get("referer")!)) {
    const _head = await head(load);

    response.headers.set("Content-Type", _head.contentType);
    response.headers.set("Content-Disposition", _head.contentDisposition);
  } else {
    response.headers.set("Content-Type", result.headers.get("Content-Type")!);
    response.headers.set(
      "Content-Disposition",
      result.headers.get("Content-Disposition")!
    );
  }

  return response;
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const data = await request.arrayBuffer();

  const url = Buffer.from(data).toString();

  if (url) {
    await del(url);
  }

  return new NextResponse(null, {
    status: 200,
  });
}
