type Invert<T extends Record<string, string>> = {
  [K in keyof T as T[K]]: string;
};

export type SearchParams<T extends Record<string, string>> = Promise<
  Partial<Invert<T>>
>;
