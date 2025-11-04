import { revalidateTag } from "next/cache";

export async function POST() {
  revalidateTag(process.env.CATALOG_SLUG as string, "max");

  return Response.json({ ok: true });
}
