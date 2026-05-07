"use client";

import { Button } from "@catalogar/ui/components/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function PrevButton({ fallbackUrl }: { fallbackUrl: string }) {
  const router = useRouter();

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  };

  return (
    <Button variant="link" className="pl-0" onClick={goBack}>
      <ChevronLeft />
      Voltar
    </Button>
  );
}
