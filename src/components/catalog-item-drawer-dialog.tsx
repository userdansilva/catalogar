"use client";

import { Dialog, DialogContent } from "@/shadcn/components/ui/dialog";
import { Drawer, DrawerContent } from "@/shadcn/components/ui/drawer";
import { ScrollArea } from "@/shadcn/components/ui/scroll-area";
import { useIsMobile } from "@/shadcn/hooks/use-mobile";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useState } from "react";

export function CatalogItemDrawerDialog({
  children,
  defaultOpen = false,
}: PropsWithChildren<{
  defaultOpen?: boolean
}>) {
  const router = useRouter();
  const [open, setOpen] = useState(defaultOpen);
  const isMobile = useIsMobile();

  const handleOpenChange = () => {
    setOpen(false);
    router.back();
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={handleOpenChange}>
        <DrawerContent>
          <ScrollArea className="max-h-[calc(100vh-120px)] pt-6">
            <div className="pb-6">
              {children}
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[1080px] pt-10">
        <ScrollArea className="max-h-[calc(100vh-100px)]">
          {children}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
