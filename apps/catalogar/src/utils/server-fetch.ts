"use server";

import { FetchError, FetchOptions } from "ofetch";
import { apiFetch } from "@/lib/ofetch";

export async function serverFetch<TError, TData>(
  request: RequestInfo,
  options: FetchOptions<"json">,
): Promise<[TError, null] | [null, TData]> {
  try {
    const response = await apiFetch<TData>(request, options);

    return [null, response];
  } catch (err) {
    const error = err as FetchError;

    return [error.data as TError, null];
  }
}
