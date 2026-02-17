import { sseStream } from "@/shared/lib/sse/server";
import { NextRequest, NextResponse } from "next/server";

export function getGameStream(req: NextRequest) {
  const { close, addCloseListener, response, write } = sseStream(req);

  let counter = 0;
  const interval = setInterval(() => {
    write(counter++);
  }, 1000);

  addCloseListener(() => {
    clearInterval(interval);
  });

  return response;
}
