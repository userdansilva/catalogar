import { FormEventHandler } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";
import { productTypeSchema } from "@/actions/schema";
import slugify from "slugify";
import { Button } from "../inputs/button";

export type ProductTypeFormValues = z.infer<typeof productTypeSchema>

type ProductTypeFormProps = {
  form: UseFormReturn<ProductTypeFormValues>
  onSubmit: FormEventHandler<HTMLFormElement>
  submitButtonLabel: string
  withSlugAutocomplete?: boolean
}

export function ProductTypeForm({
  form,
  onSubmit,
  submitButtonLabel,
  withSlugAutocomplete,
}: ProductTypeFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          name="name"
          control={form.control}
          disabled={form.formState.isSubmitting}
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>

              <FormControl>
                <Input
                  placeholder="Ex: Camisa | Caneca | Quadro | Moletom..."
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  onChange={(e) => {
                    onChange(e);

                    if (withSlugAutocomplete) {
                      const slug = e.target.value
                        ? slugify(e.target.value, { lower: true })
                        : "";

                      form.setValue("slug", slug, {
                        shouldValidate: true,
                      });
                    }
                  }}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="slug"
          control={form.control}
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>

              <FormControl>
                <Input
                  placeholder="Ex: camisa | caneca-de-festa | moletom-2025"
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
