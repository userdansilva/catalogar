import { FormEventHandler } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";
import { productTypeSchema } from "@/actions/schema";
import { Button } from "../inputs/button";

export type ProductTypeFormValues = z.infer<typeof productTypeSchema>

type ProductTypeFormProps = {
  form: UseFormReturn<ProductTypeFormValues>
  onSubmit: FormEventHandler<HTMLFormElement>
  submitButtonLabel: string
}

export function ProductTypeForm({
  form,
  onSubmit,
  submitButtonLabel,
}: ProductTypeFormProps) {
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
                  placeholder="Ex.: Camisa"
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
