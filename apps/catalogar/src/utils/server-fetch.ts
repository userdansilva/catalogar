"use server";

import type { FetchError, FetchOptions } from "ofetch";
import { apiFetch } from "@/lib/ofetch";
import type { ApiResponse, ApiResponseError } from "../types/api-response";

export async function serverFetch<
  TData extends object | object[] | undefined = undefined,
>(
  request: RequestInfo,
  options: FetchOptions<"json">,
): Promise<
  | [ApiResponseError, null]
  | [null, TData extends object | object[] ? ApiResponse<TData> : undefined]
> {
  try {
    const response = await apiFetch<
      TData extends object | object[] ? ApiResponse<TData> : undefined
    >(request, options);

    return [null, response];
  } catch (err) {
    const error = err as FetchError;

    return [error.data as ApiResponseError, null];
  }
}
