"use server";

export type FetchResult<TError, TData> = Promise<
  [TError, null] | [null, TData]
>;

export async function serverFetch<TError, TData>(config: {
  baseUrl: string;
  url: string;
  params?: object;
  headers?: HeadersInit;
  next?: NextFetchRequestConfig;
}): FetchResult<TError, TData> {
  const response = await fetch(`${config.baseUrl}${config.url}`, {
    method: "GET",
    headers: config.headers,
    next: config.next,
  });

  const data = await response.json();

  if (!response.ok) {
    return [data, null];
  }

  return [null, data];
}
