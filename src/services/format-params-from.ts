export function formatParamsFrom(obj: object) {
  const params = new URLSearchParams({});

  const filtersArray = Object.entries(obj);

  if (filtersArray.length > 0) {
    filtersArray.forEach(([key, value]) => {
      params.append(key, value.toString());
    });
  }

  return params.toString();
}
