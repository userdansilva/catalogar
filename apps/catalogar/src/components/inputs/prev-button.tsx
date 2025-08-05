"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentProps, forwardRef } from "react";
import { Button } from "@catalogar/ui/components/button";

type PrevButtonProps = Omit<
  ComponentProps<typeof Button>,
  "onClick" | "children" | "asChild"
> & {
  fallbackUrl: string;
};

export const PrevButton = forwardRef<HTMLButtonElement, PrevButtonProps>(
  ({ fallbackUrl, ...rest }, ref) => {
    const router = useRouter();

    const handleNavigateBack = () => {
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push(fallbackUrl);
      }
    };

    return (
      <Button
        variant="link"
        className="pl-0"
        onClick={handleNavigateBack}
        ref={ref}
        {...rest}
      >
        <ChevronLeft />
        Voltar
      </Button>
    );
  }
);
