"use client";

/* eslint-disable react/display-name */

import { Button } from "@/shadcn/components/ui/button";
import { ComponentProps, forwardRef } from "react";

type ShareButtonProps = Omit<ComponentProps<typeof Button>, "onClick"> & {
  shareData?: {
    title?: string;
    text?: string;
    url?: string;
  }
}

export const ShareButton = forwardRef<HTMLButtonElement, ShareButtonProps>(({
  shareData,
  children,
  ...rest
}, ref) => {
  const handleShare = async () => {
    await navigator.share(shareData ?? {
      url: window.location.href,
    });
  };

  return (
    <Button {...rest} onClick={handleShare} ref={ref}>
      {children}
    </Button>
  );
});
