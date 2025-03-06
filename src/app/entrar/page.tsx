"use client";

import { signIn } from "next-auth/react"

export default function XSignIn() {
  return (
    <div>
      <span>This is login page</span>

      <button
        onClick={() => signIn("azure-ad-b2c", {
          callbackUrl: "/"
        })}
      >
        Sign in
      </button>
    </div>
  )
}
