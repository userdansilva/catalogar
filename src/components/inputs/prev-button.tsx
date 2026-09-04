"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";

type PrevButtonProps = Omit<
  ComponentProps<typeof Button>,
  "onClick" | "children"
> & {
  fallbackUrl: string;
};

export function PrevButton({ fallbackUrl, ...props }: PrevButtonProps) {
  const router = useRouter();

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  };

  return (
    <Button variant="link" onClick={goBack} {...props}>
      <ChevronLeft />
      Voltar
    </Button>
  );
}
