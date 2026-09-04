"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { Controller, Watch } from "react-hook-form";
import { updateCategoryAction } from "@/actions/update-category-action";
import type { Category } from "@/generated/prisma/client";
import { routes } from "@/routes";
import { updateCategorySchema } from "@/schemas/category";
import { toast } from "../ui/toast";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

type UpdateCategoryFormProps = {
  category: Category;
};

export function UpdateCategoryForm({ category }: UpdateCategoryFormProps) {
  const router = useRouter();

  const { form, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(updateCategoryAction, zodResolver(updateCategorySchema), {
      formProps: {
        mode: "onChange",
        values: {
          id: category.id,
          name: category.name,
          backgroundColor: category.backgroundColor,
          textColor: category.textColor,
          isDisabled: category.disabledAt !== null,
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
          router.push(routes.categories.url);
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
            Salvando...
          </>
        ) : (
          "Salvar alterações"
        )}
      </Button>
    </form>
  );
}
