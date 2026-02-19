import { headers } from "next/headers";
import { ofetch } from "ofetch";

export default async function Page() {
  try {
    const response = await ofetch("http://localhost:3333/profile", {
      headers: await headers(),
    });
    console.log("Profile response:", response);
  } catch (error) {
    console.error("Error fetching profile:", error);
  }

  return (
    <div>
      <h1>Testing Page</h1>
    </div>
  );
}
