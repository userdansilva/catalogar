"use client";

import { Button } from "@/components/ui/button";
import { Theme } from "@/generated/prisma/client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";

type StorePrevButtonProps = {
  fallbackUrl: string;
  theme?: Theme | null;
} & Omit<ComponentProps<typeof Button>, "onClick" | "children" | "fallback">;

export function StorePrevButton({
  fallbackUrl,
  theme,
  ...props
}: StorePrevButtonProps) {
  const router = useRouter();

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  };

  return (
    <Button variant="link" size="icon-lg" onClick={goBack} {...props}>
      <ArrowLeft
        style={{
          color: theme?.secondaryColor ?? "#FFFFFF",
        }}
      />
    </Button>
  );
}
