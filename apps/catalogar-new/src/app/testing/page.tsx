import { headers } from "next/headers";
import { getCategories } from "@/gen/categories/categories";

export default async function Page() {
  const { data, status } = await getCategories({
    headers: await headers(),
  });

  if (status !== 200) {
    console.log(data.message, status);
    return "Something went wrong";
  }

  const categories = data.categories;

  console.log("categories", categories);

  return (
    <div>
      <h1>Testing Page</h1>
    </div>
  );
}
