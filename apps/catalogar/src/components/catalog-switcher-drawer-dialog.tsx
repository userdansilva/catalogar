"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { ChevronDown, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEventHandler, PropsWithChildren, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Badge } from "@catalogar/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@catalogar/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@catalogar/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@catalogar/ui/form";
import { Label } from "@catalogar/ui/label";
import { RadioGroup, RadioGroupItem } from "@catalogar/ui/radio-group";
import { ScrollArea } from "@catalogar/ui/scroll-area";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@catalogar/ui/drawer";
import { useIsMobile } from "@catalogar/ui/use-mobile";
import { Button } from "./inputs/button";
import { routes } from "@/routes";
import { switchCatalogAction } from "@/actions/switch-catalog-action";
import { Catalog } from "@/services/get-user";
import { toastServerError } from "@/utils/toast-server-error";

function CatalogSwitcherCard({
  currentCatalog,
  children,
}: PropsWithChildren<{
  currentCatalog: Catalog;
}>) {
  return (
    <Card className="flex flex-row items-center">
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
                          <Card className="flex w-full flex-row items-center py-4 shadow-none">
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
                      <Card className="flex w-full flex-row items-center py-4 shadow-none">
                        <CardHeader className="flex flex-1 flex-row items-center gap-3 py-2">
                          <FormControl>
                            <RadioGroupItem
                              value="adicionar"
                              className="mt-1"
                            />
                          </FormControl>
                          <FormLabel asChild>
                            <CardTitle className="flex items-center text-base">
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
          toast.success("Catálogo atual alterado!");
          setOpen(false);
          router.push(routes.dashboard.url);
        },
        onError: (e) => {
          const { serverError } = e.error;

          if (serverError) {
            toastServerError(serverError);
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
          <DrawerHeader className="mb-2">
            <DrawerTitle>Qual catálogo deseja visualizar?</DrawerTitle>
          </DrawerHeader>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="pb-32">
              <CatalogSwitcherForm
                form={form}
                onSubmit={handleSubmitWithAction}
                catalogs={catalogs}
                currentCatalog={currentCatalog}
              />
            </div>
          </ScrollArea>
          <DialogFooter className="bg-background sticky bottom-0 pt-4">
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
