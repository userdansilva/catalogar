"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { createCatalogAction } from "@/actions/create-catalog-action";
import { routes } from "@/routes";
import { createCatalogSchema } from "@/schemas/catalog";
import { Controller } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";
import { useEffect, useMemo } from "react";

export function CreateCatalogForm() {
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
  } = useHookFormAction(createCatalogAction, zodResolver(createCatalogSchema), {
    formProps: {
      mode: "onChange",
      defaultValues,
    },
    actionProps: {
      onSuccess: ({ input }) => {
        toast.add({
          type: "success",
          description: "Catálogo criado!",
        });
        /**
         * @see CreateCategoryForm
         */
        resetFormAndAction();
        /**
         * @see CreateCategoryForm
         */
        reset(input);
        router.push(routes.dashboard.url);
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
  });

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
            <FieldLabel>Nome do catálogo</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Ex.: Meu Catálogo"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              disabled={form.formState.isSubmitting}
            />
            <FieldDescription>
              Esse nome aparecerá apenas para você.
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? (
          <>
            <Spinner data-icon="inline-start" />
            Criando...
          </>
        ) : (
          "Criar Catálogo"
        )}
      </Button>
    </form>
  );
}
