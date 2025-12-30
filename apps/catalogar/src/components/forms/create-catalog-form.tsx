"use client";

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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createCatalogAction } from "@/actions/create-catalog-action";
import { routes } from "@/routes";
import { createCatalogSchema } from "@/schemas/catalog";
import { toastServerError } from "@/utils/toast-server-error";
import { Button } from "../inputs/button";

export function CreateCatalogForm() {
  const router = useRouter();

  const { form, handleSubmitWithAction } = useHookFormAction(
    createCatalogAction,
    zodResolver(createCatalogSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          name: "",
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success("Catálogo criado!", {
            description: res.data.message,
          });
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

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-8">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do catálogo</FormLabel>

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

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          loading={form.formState.isSubmitting}
        >
          Criar Catálogo
        </Button>
      </form>
    </Form>
  );
}
