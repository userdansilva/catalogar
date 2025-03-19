import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  // eslint-disable-next-line no-console
  console.log(session);

  return (
    <div>
      this is fine
    </div>
  );
}
