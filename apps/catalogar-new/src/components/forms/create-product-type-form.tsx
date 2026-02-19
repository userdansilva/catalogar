"use client";

import {
  Form,
  FormControl,
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
import { createProductTypeAction } from "@/actions/create-product-type-action";
import { routes } from "@/routes";
import { createProductTypeSchema } from "@/schemas/product-type";
import { toastServerError } from "@/utils/toast-server-error";
import { Button } from "../inputs/button";

type CreateProductTypeFormProps = {
  callbackUrl?: string;
};

export function CreateProductTypeForm({
  callbackUrl,
}: CreateProductTypeFormProps) {
  const router = useRouter();

  const { form, handleSubmitWithAction } = useHookFormAction(
    createProductTypeAction,
    zodResolver(createProductTypeSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          name: "",
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success("Tipo de produto adicionado!", {
            description: res.data.message,
          });
          router.push(callbackUrl || routes.productTypes.url);
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
                  placeholder="Ex.: Camisa"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          loading={form.formState.isSubmitting}
        >
          Adicionar
        </Button>
      </form>
    </Form>
  );
}
