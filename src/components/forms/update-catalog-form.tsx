"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { updateCatalogAction } from "@/actions/update-catalog-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCatalogSchema } from "@/actions/schema";
import { toast } from "sonner";
import { Catalog } from "@/types/api-types";
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/shadcn/components/ui/form";
import { z } from "zod";
import { Input } from "@/shadcn/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/shadcn/components/ui/select";
import { Button } from "../inputs/button";

export type CatalogFormValues = z.infer<typeof updateCatalogSchema>

export function UpdateCatalogForm({
  catalog,
}: {
  catalog: Catalog
}) {
  const { form, handleSubmitWithAction } = useHookFormAction(
    updateCatalogAction,
    zodResolver(updateCatalogSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          name: catalog.name,
          isPublished: catalog.isPublished,
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success("Sucesso!", {
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
      <form onSubmit={handleSubmitWithAction} className="space-y-8">
        <FormField
          name="name"
          control={form.control}
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>

              <FormControl>
                <Input
                  placeholder="Ex.: Meu Catálogo"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  {...field}
                />
              </FormControl>

              <FormDescription>
                Esse nome aparecerá apenas para você.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="isPublished"
          control={form.control}
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visibilidade</FormLabel>
              <Select
                onValueChange={(e) => {
                  field.onChange(e === "PUBLIC");
                }}
                defaultValue={field.value ? "PUBLIC" : "PRIVATE"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PUBLIC">
                    Público
                    {" "}
                    <span className="text-muted-foreground">(Todos podem visualizar)</span>
                  </SelectItem>
                  <SelectItem value="PRIVATE">
                    Privado
                    {" "}
                    <span className="text-muted-foreground">(Apenas você pode visualizar)</span>
                  </SelectItem>
                </SelectContent>
              </Select>

              {!catalog.slug && form.watch("isPublished") && (
                <FormDescription>
                  Após clicar em Salvar Alterações você será redirecionado para
                  a tela de publicação de catálogo.
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          loading={form.formState.isSubmitting}
        >
          Salvar Alterações
        </Button>
      </form>
    </Form>
  );
}
