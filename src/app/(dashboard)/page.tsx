import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  console.log(session)

  return (
    <div>
      this is fine
    </div>
  )
}
