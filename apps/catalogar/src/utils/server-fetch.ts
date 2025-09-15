"use server";

export type FetchResult<TError, TData> = Promise<
  [TError, null] | [null, TData]
>;

export async function serverFetch<TError, TData>({
  url,
  ...config
}: RequestInit & {
  url: string;
  next?: NextFetchRequestConfig;
  cache?: RequestCache;
  params?: object;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
}): FetchResult<TError, TData> {
  const response = await fetch(`${process.env.API_URL}/api${url}`, config);

  const data = await response.json();

  if (!response.ok) {
    return [data, null];
  }

  return [null, data];
}
