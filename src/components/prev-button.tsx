"use client";

import { Button } from "@/shadcn/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function PrevButton({
  baseUrl,
}: {
  baseUrl: string
}) {
  const router = useRouter();

  const handleNavigateBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(baseUrl);
    }
  };

  return (
    <Button variant="link" onClick={handleNavigateBack} className="pl-0">
      <ChevronLeft />
      Voltar
    </Button>
  );
}
