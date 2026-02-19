"use client";

import { useEffect } from "react";
import { UncaughtException } from "@/components/error-handling/uncaught-exception";

export default function CategoriesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <UncaughtException reset={reset} />;
}
