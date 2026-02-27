import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { SayHelloClient } from "./client";

export async function SayHello() {
  prefetch(trpc.categories.getAll.queryOptions());

  return (
    <HydrateClient>
      <SayHelloClient />
    </HydrateClient>
  );
}
