"use server";

export type FetchResult<TError, TData> = Promise<
  [TError, null] | [null, TData]
>;

export async function serverFetch<TError, TData>({
  url,
  params,
  ...config
}: RequestInit & {
  url: string;
  next?: NextFetchRequestConfig;
  cache?: RequestCache;
  params?: Record<string, string>;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
}): FetchResult<TError, TData> {
  const searchParams = new URLSearchParams(params);

  const response = await fetch(
    `${process.env.API_URL}/api${url}?${searchParams}`,
    config
  );

  const data = await response.json();

  if (!response.ok) {
    return [data, null];
  }

  return [null, data];
}
