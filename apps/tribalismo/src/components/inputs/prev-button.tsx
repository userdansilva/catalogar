import { ChevronLeft } from "lucide-react";
import { Button } from "@catalogar/ui/button";
import Link from "next/link";

export function PrevButton({ url }: { url: string }) {
  return (
    <Button variant="link" className="pl-0" asChild>
      <Link href={url}>
        <ChevronLeft />
        Voltar
      </Link>
    </Button>
  );
}
