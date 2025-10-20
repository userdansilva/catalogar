"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@catalogar/ui/form";
import { Input } from "@catalogar/ui/input";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@catalogar/ui/card";
import { Watch } from "react-hook-form";
import { Button } from "../inputs/button";
import { routes } from "@/routes";
import { publishCatalogAction } from "@/actions/publish-catalog-action";
import { toastServerError } from "@/utils/toast-server-error";
import { Catalog } from "@/services/get-user";
import { publishCatalogSchema } from "@/schemas/catalog";

export function PublishCatalogForm({
  currentCatalog,
}: {
  currentCatalog: Catalog;
}) {
  const router = useRouter();

  const { form, handleSubmitWithAction } = useHookFormAction(
    publishCatalogAction,
    zodResolver(publishCatalogSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          slug: currentCatalog.slug ?? "",
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success("Catálogo Publicado!!", {
            description: res.data.message,
          });
          router.push(routes.catalog.sub.published.url);
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

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-6">
        <FormField
          name="slug"
          control={form.control}
          render={({ field: { onChange, ...field } }) => (
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
                      onChange={(e) => {
                        e.target.value
                          .toLowerCase()
                          .replace(/\s+/g, "-")
                          .replace(/[^a-z0-9-]/g, "")
                          .replace(/-+/g, "-")
                          .replace(/(^-)|(-$)/g, "");

                        onChange(e);
                      }}
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
            <CardTitle className="text-base">
              Seu link depois de publicar
            </CardTitle>

            <CardDescription>
              <Watch
                control={form.control}
                names={["slug"] as const}
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
