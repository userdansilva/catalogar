import { auth } from "@/auth";
import { ApiResponse } from "@/types/api-response";
import { redirect } from "next/navigation";

type User = {
  id: string
  name: string
  email: string
  phoneNumber?: string
  catalogs: Array<string> // must be updated
  currentCatalog?: string // must be updated
  createdAt: string
  updatedAt: string
}

export async function getUser() {
  const session = await auth();

  if (!session) {
    redirect("/entrar")
  }

  const res = await fetch(`${process.env.API_URL}/api/v1/users/me`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`
    }
  })

  const data = await res.json()

  return data as ApiResponse<User>
}
