"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { UncaughtException } from "@/components/error-handling/uncaught-exception";

export default function CategoriesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return <UncaughtException reset={reset} />;
}
