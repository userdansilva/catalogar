"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { Controller, Watch } from "react-hook-form";
import { createCategoryAction } from "@/actions/create-category-action";
import { routes } from "@/routes";
import { createCategorySchema } from "@/schemas/category";
import { toast } from "../ui/toast";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useEffect, useMemo } from "react";

type CreateCategoryFormProps = {
  callbackUrl?: string;
};

export function CreateCategoryForm({ callbackUrl }: CreateCategoryFormProps) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      name: "",
      textColor: "#FFFFFF",
      backgroundColor: "#000000",
    }),
    [],
  );

  const {
    form: { reset, ...form },
    handleSubmitWithAction,
    resetFormAndAction,
  } = useHookFormAction(
    createCategoryAction,
    zodResolver(createCategorySchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues,
      },
      actionProps: {
        onSuccess: ({ input }) => {
          toast.add({
            type: "success",
            description: "Categoria adicionada!",
          });
          /**
           * resetFormAndAction aparece na documentação do next-safe-action
           * mas não fica claro o real uso além de reset do formulário.
           */
          resetFormAndAction();
          /**
           * Reset necessário para manter aparência do formulário
           * durante o envio
           */
          reset(input);
          router.push(callbackUrl || routes.categories.url);
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
     * Reset garante que o formulário vai estar com os valores default
     * no próximo render, caso contrário vai ser exibida os itens da
     * última criação.
     *
     * Esse padrão é descrito na documentação do React-Hook-Form
     * https://react-hook-form.com/docs/useform#resolver
     *
     * Também é necessário passar os defaultValues pois os valores
     * do defaultValues já foram alterados no reset do input, então
     * rodar o reset sem os defaultValues, resulta na exibição dos
     * itens da última criação.
     *
     * Formulários são complicados PQP
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
              placeholder="Ex.: Dia dos namorados"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              disabled={form.formState.isSubmitting}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Card>
        <CardHeader>
          <CardTitle>Pré-visualização</CardTitle>
        </CardHeader>

        <CardContent>
          <Watch
            control={form.control}
            name={["name", "textColor", "backgroundColor"]}
            render={([name, textColor, backgroundColor]) => (
              <Badge
                style={{
                  color: textColor,
                  background: backgroundColor,
                }}
              >
                {(name || "Categoria").trim()}
              </Badge>
            )}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-8">
        <Controller
          name="backgroundColor"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Cor de fundo</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                type="color"
                className="w-full max-w-48"
                disabled={form.formState.isSubmitting}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="textColor"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Cor do texto</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                type="color"
                className="w-full max-w-48"
                disabled={form.formState.isSubmitting}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

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
