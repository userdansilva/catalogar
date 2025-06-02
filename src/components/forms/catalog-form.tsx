"use client";

import { catalogSchema } from "@/actions/schema";
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/shadcn/components/ui/form";
import { z } from "zod";
import { Input } from "@/shadcn/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/shadcn/components/ui/alert";
import { Lightbulb } from "lucide-react";
import { Checkbox } from "@/shadcn/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { FormEventHandler } from "react";
import slugify from "slugify";
import { Button } from "../inputs/button";

export type CatalogFormValues = z.infer<typeof catalogSchema>

type CatalogFormProps = {
  form: UseFormReturn<CatalogFormValues>
  onSubmit: FormEventHandler<HTMLFormElement>
  submitButtonLabel: string
  withSlugAutocomplete?: boolean
  withSlugTip?: boolean
}

export function CatalogForm({
  form,
  onSubmit,
  submitButtonLabel,
  withSlugAutocomplete,
  withSlugTip,
}: CatalogFormProps) {
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
                  placeholder="Ex.: Meu Catálogo"
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

              <FormDescription>
                Você pode ter várias catálogos. O nome serve para identificar este catálogo.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        {withSlugTip && (
          <Alert>
            <Lightbulb className="size-4" />
            <AlertTitle>Dica importante!</AlertTitle>
            <AlertDescription>
              Evite mudar o slug com frequência. Se você alterar o slug,
              o link atual vai ser alterado e seus clientes
              precisarão acessar com o novo link.
            </AlertDescription>
          </Alert>
        )}

        <FormField
          name="slug"
          control={form.control}
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>

              <FormControl>
                <Input
                  placeholder="Ex: meu-catalogo"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  {...field}
                />
              </FormControl>

              <FormDescription>
                Identificador para sua URL. Exemplo:
                {" "}
                <span className="underline underline-offset-2">meu-catalogo</span>
                {" "}
                seu cliente vai acessar como
                {" "}
                <span className="underline underline-offset-2">https://app.catalogar.com.br/meu-catalogo</span>
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="isPublished"
          control={form.control}
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>

              <div className="space-y-1 leading-none">
                <FormLabel>
                  Publicar meu catálogo (recomendado)
                </FormLabel>
                <FormDescription>
                  Públicos são visíveis para qualquer pessoa, pelo o seu link público,
                  enquanto não publicado só podem se acessado por você.
                </FormDescription>
              </div>
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
