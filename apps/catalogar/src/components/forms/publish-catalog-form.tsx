"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@catalogar/ui/components/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@catalogar/ui/components/form";
import { Input } from "@catalogar/ui/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { Watch } from "react-hook-form";
import { toast } from "sonner";
import { publishCatalogAction } from "@/actions/publish-catalog-action";
import type { Catalog } from "@/generated/prisma/client";
import { routes } from "@/routes";
import { publishCatalogSchema } from "@/schemas/catalog";
import { Button } from "../inputs/button";

type PublishCatalogFormProps = {
  currentCatalog: Catalog;
};

export function PublishCatalogForm({
  currentCatalog,
}: PublishCatalogFormProps) {
  const router = useRouter();

  const { form, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(publishCatalogAction, zodResolver(publishCatalogSchema), {
      formProps: {
        mode: "onChange",
        defaultValues: {
          slug: currentCatalog.slug ?? "",
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.success("Catálogo Publicado!!");
          resetFormAndAction();
          router.push(routes.catalog.sub.published.url);
        },
        onError: (e) => {
          const { serverError } = e.error;

          if (serverError) {
            toast.error(serverError.message);
          }
        },
      },
    });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-6">
        <FormField
          name="slug"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Link customizado</FormLabel>

              <div className="flex">
                <div className="bg-muted text-muted-foreground flex h-9 items-center rounded-l-md border border-r-0 px-3 py-2 text-sm">
                  {`${process.env.NEXT_PUBLIC_BASE_URL}/@`}
                </div>
                <div className="flex-1">
                  <FormControl>
                    <Input
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck="false"
                      className="rounded-l-none"
                      placeholder="minha-empresa"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                </div>
              </div>

              <FormDescription>
                Apenas letras minúsculas, números e hífens são permitidos
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Seu link customizado</CardTitle>

            <CardDescription>
              <Watch
                control={form.control}
                name={["slug"]}
                render={([slug]) =>
                  slug
                    ? `${process.env.NEXT_PUBLIC_BASE_URL}/@${slug}`
                    : "Defina um link customizado para ver seu link"
                }
              />
            </CardDescription>
          </CardHeader>
        </Card>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          loading={form.formState.isSubmitting}
          className="w-full"
        >
          <Rocket />
          Publicar Catálogo
        </Button>
      </form>
    </Form>
  );
}
