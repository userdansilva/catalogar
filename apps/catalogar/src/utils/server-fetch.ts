"use server";

import { FetchError, FetchOptions } from "ofetch";
import { apiFetch } from "@/lib/ofetch";
import { ApiResponse, ApiResponseError } from "../types/api-response";

export async function serverFetch<
  TData extends object | object[] | void = void,
>(
  request: RequestInfo,
  options: FetchOptions<"json">,
): Promise<
  | [ApiResponseError, null]
  | [null, TData extends object | object[] ? ApiResponse<TData> : void]
> {
  try {
    const response = await apiFetch<
      TData extends object | object[] ? ApiResponse<TData> : void
    >(request, options);

    return [null, response];
  } catch (err) {
    const error = err as FetchError;

    return [error.data as ApiResponseError, null];
  }
}
