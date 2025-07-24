type Invert<T extends Record<string, string>> = {
  [K in keyof T as T[K] extends string ? T[K] : never]?: string;
};

export type SearchParams<T extends Record<Readonly<string>, Readonly<string>>> =
  Invert<T>;
