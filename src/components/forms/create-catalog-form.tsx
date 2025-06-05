"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { createCatalogAction } from "@/actions/create-catalog-action";
import { toast } from "sonner";
import { routes } from "@/routes";
import { createCatalogSchema } from "@/actions/schema";
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";
import { Button } from "../inputs/button";

export type CatalogFormValues = z.infer<typeof createCatalogSchema>

export function CreateCatalogForm() {
  const { form, handleSubmitWithAction } = useHookFormAction(
    createCatalogAction,
    zodResolver(createCatalogSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          name: "",
          redirectTo: routes.dashboard.url,
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success("Sucesso! Redirecionando para tela inicial...", {
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
                Você pode ter várias catálogos. O nome serve para identificar este catálogo.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          loading={form.formState.isSubmitting}
        >
          Criar catálogo
        </Button>
      </form>
    </Form>
  );
}
