"use server";

export async function serverFetch<TError, TData>({
  url,
  params,
  method,
  ...config
}: RequestInit & {
  url: string;
  next?: NextFetchRequestConfig;
  cache?: RequestCache;
  params?: Record<string, string>;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
}): Promise<[TError, null] | [null, TData]> {
  const searchParams = new URLSearchParams(params);

  const formattedParams = searchParams.size >= 1 ? `?${searchParams}` : "";

  const response = await fetch(
    `${process.env.API_URL}/api${url}${formattedParams}`,
    {
      ...config,
      method,
    },
  );

  /**
   * Delete não retorna valor no sucesso, isso causava uma quebra ao
   * tentar converter a resposta para json
   */
  if (method === "DELETE" && response.ok) {
    return [null, null as TData];
  }

  const data = await response.json();

  if (!response.ok) {
    return [data, null];
  }

  return [null, data];
}
