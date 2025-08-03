export function defineSearchParamNames<T extends Record<string, string>>(
  obj: T & { [K in keyof T]: T[K] },
): { readonly [K in keyof T]: T[K] } {
  return obj;
}
