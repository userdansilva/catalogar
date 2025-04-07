export function paginate<T>(items: Array<T>, params: {
  currentPage: number
  perPage: number
}) {
  const startIndex = (params.currentPage - 1) * params.perPage;
  const endIndex = startIndex + params.perPage;

  return [...items].slice(startIndex, endIndex);
}
