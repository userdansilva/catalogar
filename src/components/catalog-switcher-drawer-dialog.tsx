"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ChevronDown, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEventHandler, PropsWithChildren, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./inputs/button";
import { switchCatalogAction } from "@/actions/switch-catalog-action";
import { routes } from "@/routes";
import { Badge } from "@/shadcn/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/components/ui/form";
import { Label } from "@/shadcn/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shadcn/components/ui/radio-group";
import { ScrollArea } from "@/shadcn/components/ui/scroll-area";
import { Catalog } from "@/types/api-types";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shadcn/components/ui/drawer";
import { useIsMobile } from "@/shadcn/hooks/use-mobile";

function CatalogSwitcherCard({
  currentCatalog,
  children,
}: PropsWithChildren<{
  currentCatalog: Catalog;
}>) {
  return (
    <Card className="flex items-center">
      <CardHeader className="flex-1">
        <CardDescription className="text-xs">
          <span>{currentCatalog.isPublished ? "Público" : "Privado"}</span>
          {currentCatalog.slug && (
            <span className="text-muted-foreground">{` @${currentCatalog.slug}`}</span>
          )}
        </CardDescription>
        <CardTitle className="text-xl">{currentCatalog.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center pb-0">
        {children}
      </CardContent>
    </Card>
  );
}

const schema = z.object({
  id: z.string(),
});

function CatalogSwitcherForm({
  form,
  onSubmit,
  catalogs,
  currentCatalog,
}: {
  form: UseFormReturn<z.infer<typeof schema>>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  catalogs: Array<Catalog>;
  currentCatalog: Catalog;
}) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} id="catalog-switcher-drawer-dialog">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col"
                >
                  {catalogs.map((catalog) => {
                    const isCurrent = catalog.id === currentCatalog.id;

                    return (
                      <FormItem
                        className="flex items-center gap-3"
                        key={catalog.id}
                      >
                        <Label className="w-full cursor-pointer">
                          <Card className="flex w-full items-center shadow-none">
                            <CardHeader className="flex flex-1 flex-row items-center gap-3 py-2">
                              <FormControl>
                                <RadioGroupItem value={catalog.id} />
                              </FormControl>
                              <div>
                                <FormLabel asChild>
                                  <CardTitle className="text-base">
                                    {catalog.name}
                                  </CardTitle>
                                </FormLabel>
                                <CardDescription className="text-xs">
                                  <span>
                                    {catalog.isPublished
                                      ? "Público"
                                      : "Privado"}
                                  </span>
                                  {catalog.slug && (
                                    <span className="text-muted-foreground">{` @${catalog.slug}`}</span>
                                  )}
                                </CardDescription>
                              </div>
                            </CardHeader>

                            {isCurrent && (
                              <CardContent className="pb-0">
                                <Badge>Atual</Badge>
                              </CardContent>
                            )}
                          </Card>
                        </Label>
                      </FormItem>
                    );
                  })}

                  <FormItem className="flex items-center gap-3">
                    <Label className="w-full cursor-pointer">
                      <Card className="flex w-full items-center shadow-none">
                        <CardHeader className="flex flex-1 flex-row items-center gap-3 py-2">
                          <FormControl>
                            <RadioGroupItem
                              value="adicionar"
                              className="mt-1"
                            />
                          </FormControl>
                          <FormLabel asChild>
                            <CardTitle className="-mt-10 flex items-center text-base">
                              <Plus className="mr-2 size-4" />
                              Adicionar
                            </CardTitle>
                          </FormLabel>
                        </CardHeader>
                      </Card>
                    </Label>
                  </FormItem>
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export function CatalogSwitcherDrawerDialog({
  catalogs,
  currentCatalog,
}: {
  catalogs: Array<Catalog>;
  currentCatalog: Catalog;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const { form, handleSubmitWithAction } = useHookFormAction(
    switchCatalogAction,
    zodResolver(schema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          id: currentCatalog.id,
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.success("Catálogo atual alterado! Atualizando...");
          setOpen(false);
          router.refresh();
        },
        onError: (e) => {
          const { serverError } = e.error;

          if (serverError) {
            toast.error("Ops! Algo deu errado", {
              description: serverError.message,
            });
          }
        },
      },
    },
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <CatalogSwitcherCard currentCatalog={currentCatalog}>
          <DrawerTrigger asChild>
            <Button>
              Trocar
              <ChevronDown />
            </Button>
          </DrawerTrigger>
        </CatalogSwitcherCard>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Qual catálogo deseja visualizar?</DrawerTitle>
          </DrawerHeader>
          <ScrollArea className="h-[calc(100vh-200px)] pt-6">
            <div className="pb-6">
              <CatalogSwitcherForm
                form={form}
                onSubmit={handleSubmitWithAction}
                catalogs={catalogs}
                currentCatalog={currentCatalog}
              />
            </div>
          </ScrollArea>
          <DialogFooter>
            <DrawerClose asChild>
              <Button variant="ghost">Cancelar</Button>
            </DrawerClose>
            {form.watch("id") === "adicionar" ? (
              <Button asChild>
                <Link href={routes.catalog.sub.new.url}>Confirmar</Link>
              </Button>
            ) : (
              <Button
                type="submit"
                form="catalog-switcher-drawer-dialog"
                loading={form.formState.isSubmitting}
                disabled={form.formState.isSubmitting}
              >
                Confirmar
              </Button>
            )}
          </DialogFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <CatalogSwitcherCard currentCatalog={currentCatalog}>
        <DialogTrigger asChild>
          <Button>
            Trocar
            <ChevronDown />
          </Button>
        </DialogTrigger>
      </CatalogSwitcherCard>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Qual catálogo deseja visualizar?</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(100vh-200px)]">
          <CatalogSwitcherForm
            form={form}
            onSubmit={handleSubmitWithAction}
            catalogs={catalogs}
            currentCatalog={currentCatalog}
          />
        </ScrollArea>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          {form.watch("id") === "adicionar" ? (
            <Button asChild>
              <Link href={routes.catalog.sub.new.url}>Confirmar</Link>
            </Button>
          ) : (
            <Button
              type="submit"
              form="catalog-switcher-drawer-dialog"
              loading={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting}
            >
              Confirmar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
