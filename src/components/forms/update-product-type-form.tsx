"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { updateProductTypeAction } from "@/actions/update-product-type-action";
import type { ProductType } from "@/generated/prisma/client";
import { routes } from "@/routes";
import { updateProductTypeSchema } from "@/schemas/product-type";
import { toast } from "../ui/toast";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

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
          values: {
            id: productType.id,
            name: productType.name,
            isDisabled: !!productType.disabledAt,
          },
        },
        actionProps: {
          onSuccess: ({ input }) => {
            toast.add({
              type: "success",
              description: "Alterações salvas!",
            });
            resetFormAndAction();
            form.reset(input);
            router.push(routes.productTypes.url);
          },
          onError: (e) => {
            const { serverError } = e.error;

            if (serverError) {
              toast.add({
                type: "error",
                description: serverError.message,
              });
            }
          },
        },
      },
    );

  return (
    <form onSubmit={handleSubmitWithAction} className="space-y-8">
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Nome</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Ex.: Camisa"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              disabled={form.formState.isSubmitting}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? (
          <>
            <Spinner data-icon="inline-start" />
            Salvando...
          </>
        ) : (
          "Salvar alterações"
        )}
      </Button>
    </form>
  );
}
