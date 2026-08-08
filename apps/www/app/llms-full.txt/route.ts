import { renderLlmsFullText } from "@/lib/agent-docs";

export const dynamic = "force-static";

export function GET() {
  return new Response(renderLlmsFullText(), {
    headers: {
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
