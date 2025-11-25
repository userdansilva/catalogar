"use client";

import { Check, Copy } from "lucide-react";
import { ComponentProps, forwardRef, useState } from "react";
import { Button } from "@catalogar/ui/components/button";

type CopyButtonProps = Omit<
  ComponentProps<typeof Button>,
  "onClick" | "children" | "asChild"
> & {
  textToCopy: string;
};

export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ textToCopy, ...rest }, ref) => {
    const [isCopied, setCopied] = useState(false);

    const handleCopy = async () => {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2_000);
    };

    return (
      <Button {...rest} onClick={handleCopy} ref={ref}>
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
  },
);
