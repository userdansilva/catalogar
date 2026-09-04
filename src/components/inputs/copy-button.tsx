"use client";

import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { type ComponentProps, useState } from "react";

type CopyButtonProps = Omit<ComponentProps<typeof Button>, "onClick"> & {
  textToCopy: string;
};

export function CopyButton({ textToCopy, ...props }: CopyButtonProps) {
  const [isCopied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2_000);
  };

  return (
    <Button onClick={handleCopy} {...props}>
      {!isCopied ? (
        <>
          Copiar
          <Copy />
        </>
      ) : (
        <>
          Copiado
          <Check />
        </>
      )}
    </Button>
  );
}
