import { categorySchema } from "@/actions/schema";
import { Badge } from "@/shadcn/components/ui/badge";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/shadcn/components/ui/card";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";
import { FormEventHandler } from "react";
import { Control, UseFormReturn, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "../inputs/button";

export type CategoryFormValues = z.infer<typeof categorySchema>

type CategoryPreviewProps = {
  control: Control<CategoryFormValues>
}

function CategoryBadgePreview({
  control,
}: CategoryPreviewProps) {
  const {
    name, textColor, backgroundColor,
  } = useWatch({ control });

  return (
    <Badge style={{ color: textColor, background: backgroundColor }}>
      {(name || "Categoria").trim()}
    </Badge>
  );
}

type CategoryFormProps = {
  form: UseFormReturn<CategoryFormValues>
  onSubmit: FormEventHandler<HTMLFormElement>
  submitButtonLabel: string
}

export function CategoryForm({
  form,
  onSubmit,
  submitButtonLabel,
}: CategoryFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          name="name"
          control={form.control}
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>

              <FormControl>
                <Input
                  placeholder="Ex: Formatura | Carnaval | Dia das Mães | Natal..."
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <CategoryBadgePreview control={form.control} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-8">
          <FormField
            name="backgroundColor"
            control={form.control}
            disabled={form.formState.isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor de fundo</FormLabel>

                <FormControl>
                  <Input
                    type="color"
                    className="w-1/2"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="textColor"
            control={form.control}
            disabled={form.formState.isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor do texto</FormLabel>

                <FormControl>
                  <Input
                    type="color"
                    className="w-1/2"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          loading={form.formState.isSubmitting}
        >
          {submitButtonLabel}
        </Button>
      </form>
    </Form>
  );
}
