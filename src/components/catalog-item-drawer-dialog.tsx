"use client";

import { Dialog, DialogContent } from "@/shadcn/components/ui/dialog";
import { Drawer, DrawerContent } from "@/shadcn/components/ui/drawer";
import { ScrollArea } from "@/shadcn/components/ui/scroll-area";
import { useIsMobile } from "@/shadcn/hooks/use-mobile";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useState } from "react";

/**
 * Componente não utilizado
 *
 * Abordagem de Parallel Routes e Interceptuing Routes
 * não funciona bem com [slug] no root, acaba quebrando
 * outras telas como /categorias/novo (carrega a PR e
 * IR ao invés da página)
 *
 * Acompanhar futuros updates do Nextjs
 * Versão atual: 15.3.4
 */
export function CatalogItemDrawerDialog({
  children,
  defaultOpen = false,
}: PropsWithChildren<{
  defaultOpen?: boolean;
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
          <ScrollArea className="h-[calc(100vh-120px)] pt-6">
            <div className="pb-6">{children}</div>
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
