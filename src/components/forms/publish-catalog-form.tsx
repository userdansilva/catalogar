"use client";

import { publishCatalogSchema } from "@/actions/schema";
import { routes } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";
import { Rocket } from "lucide-react";
import {
  Card, CardDescription, CardHeader, CardTitle,
} from "@/shadcn/components/ui/card";
import { publishCatalogAction } from "@/actions/publish-catalog-action";
import { Button } from "../inputs/button";

export function PublishCatalogForm() {
  const { form, handleSubmitWithAction } = useHookFormAction(
    publishCatalogAction,
    zodResolver(publishCatalogSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          slug: "",
          redirectTo: routes.catalog.sub.published.url,
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success("Sucesso! Catálogo publicado", {
            description: res.data?.message,
          });
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

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-6">
        <FormField
          name="slug"
          control={form.control}
          disabled={form.formState.isSubmitting}
          render={({ field: { onChange, ...field } }) => (
            <FormItem className="space-y-2">
              <FormLabel>Link customizado</FormLabel>

              <div className="flex">
                <div className="flex h-9 items-center rounded-l-md border border-r-0 bg-muted px-3 py-2 text-sm text-muted-foreground">
                  {`${routes.external.url}/`}
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
                          .replace(/^-|-$/g, "");

                        onChange(e);
                      }}
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
              {form.watch("slug")
                ? `${routes.external.url}/${form.watch("slug")}`
                : "Defina um link customizado para ver o resulto"}
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
