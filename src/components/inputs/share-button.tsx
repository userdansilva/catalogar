"use client";

import { Button } from "@/components/ui/button";
import { type ComponentProps } from "react";

type ShareButtonProps = Omit<ComponentProps<typeof Button>, "onClick"> & {
  shareData?: {
    title?: string;
    text?: string;
    url?: string;
  };
};

export function ShareButton({
  shareData,
  children,
  ...props
}: ShareButtonProps) {
  const handleShare = async () => {
    await navigator.share(
      shareData ?? {
        url: window.location.href,
      },
    );
  };

  return (
    <Button onClick={handleShare} {...props}>
      {children}
    </Button>
  );
}
