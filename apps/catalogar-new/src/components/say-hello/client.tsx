"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function SayHelloClient() {
  const trpc = useTRPC();
  const { data, isLoading, error } = useQuery(
    trpc.categories.getAll.queryOptions(),
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("error fetching data: ", error);
    return <div>{error.message}</div>;
  }

  console.log(
    "data",
    data?.map((data) => data.name),
  );

  return <div>This is fine</div>;
}
