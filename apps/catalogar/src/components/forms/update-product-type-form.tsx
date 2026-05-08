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
import { updateProductTypeAction } from "@/actions/update-product-type-action";
import type { ProductType } from "@/generated/prisma/client";
import { routes } from "@/routes";
import { updateProductTypeSchema } from "@/schemas/product-type";
import { Button } from "../inputs/button";

type UpdateProductTypeFormProps = {
  productType: ProductType;
};

export function UpdateProductTypeForm({
  productType,
}: UpdateProductTypeFormProps) {
  const router = useRouter();

  const { form, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(
      updateProductTypeAction,
      zodResolver(updateProductTypeSchema),
      {
        formProps: {
          mode: "onChange",
          defaultValues: {
            id: productType.id,
            name: productType.name,
            isDisabled: !!productType.disabledAt,
          },
        },
        actionProps: {
          onSuccess: ({ data: { productType } }) => {
            toast.success("Alterações salvas!");
            resetFormAndAction();
            form.reset({
              id: productType.id,
              name: productType.name,
              isDisabled: !!productType.disabledAt,
            });
            router.push(routes.productTypes.url);
          },
          onError: (e) => {
            const { serverError } = e.error;

            if (serverError) {
              toast.error(serverError.message);
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
          Salvar alterações
        </Button>
      </form>
    </Form>
  );
}
