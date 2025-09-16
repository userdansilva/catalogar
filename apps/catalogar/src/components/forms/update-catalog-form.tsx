"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@catalogar/ui/components/select";
import { Button } from "../inputs/button";
import { updateCatalogAction } from "@/actions/update-catalog-action";
import { updateCatalogSchema } from "@/actions/schema";
import { routes } from "@/routes";
import { toastServerError } from "@/utils/toast-server-error";
import { Catalog } from "@/services/get-user";

export type CatalogFormValues = z.infer<typeof updateCatalogSchema>;

export function UpdateCatalogForm({
  catalog,
  callbackUrl,
}: {
  catalog: Catalog;
  callbackUrl?: string;
}) {
  const router = useRouter();

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
          toast.success(
            `Sucesso! ${
              !callbackUrl
                ? "Voltando para Página Inicial..."
                : "Redirecionando..."
            }`,
            {
              description: res.data?.message,
            },
          );
          router.push(callbackUrl || routes.dashboard.url);
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
      <form onSubmit={handleSubmitWithAction} className="space-y-8">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>

              <FormControl>
                <Input
                  placeholder="Ex.: Meu Catálogo"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  disabled={form.formState.isSubmitting}
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visibilidade</FormLabel>
              <Select
                onValueChange={(e) => {
                  field.onChange(e === "PUBLIC");
                }}
                defaultValue={field.value ? "PUBLIC" : "PRIVATE"}
                disabled={form.formState.isSubmitting}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PUBLIC">
                    Público{" "}
                    <span className="text-muted-foreground">
                      (Todos podem visualizar)
                    </span>
                  </SelectItem>
                  <SelectItem value="PRIVATE">
                    Privado{" "}
                    <span className="text-muted-foreground">
                      (Apenas você pode visualizar)
                    </span>
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
          Salvar alterações
        </Button>
      </form>
    </Form>
  );
}
