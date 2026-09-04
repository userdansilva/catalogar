"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { createProductTypeAction } from "@/actions/create-product-type-action";
import { routes } from "@/routes";
import { createProductTypeSchema } from "@/schemas/product-type";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { toast } from "../ui/toast";
import { useEffect, useMemo } from "react";

type CreateProductTypeFormProps = {
  callbackUrl?: string;
};

export function CreateProductTypeForm({
  callbackUrl,
}: CreateProductTypeFormProps) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      name: "",
    }),
    [],
  );

  const {
    form: { reset, ...form },
    handleSubmitWithAction,
    resetFormAndAction,
  } = useHookFormAction(
    createProductTypeAction,
    zodResolver(createProductTypeSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues,
      },
      actionProps: {
        onSuccess: ({ input }) => {
          toast.add({
            type: "success",
            description: "Tipo de produto adicionado!",
          });
          /**
           * @see CreateCategoryForm
           */
          resetFormAndAction();
          /**
           * @see CreateCategoryForm
           */
          reset(input);
          router.replace(callbackUrl || routes.productTypes.url);
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

  useEffect(() => {
    /**
     * @see CreateCategoryForm
     */
    reset(defaultValues);
  }, [defaultValues, reset]);

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
            Adicionando...
          </>
        ) : (
          "Adicionar"
        )}
      </Button>
    </form>
  );
}
