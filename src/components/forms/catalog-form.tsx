"use client";

import { catalogSchema } from "@/actions/schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shadcn/components/ui/form";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shadcn/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/shadcn/components/ui/alert";
import { Lightbulb } from "lucide-react";
import { Checkbox } from "@/shadcn/components/ui/checkbox";
import { Button } from "@/shadcn/components/ui/button";

type FormValues = z.infer<typeof catalogSchema>

type CatalogFormProps = {
  withSlugTip?: boolean
  submitButtonLabel?: string
}

export function CatalogForm({
  withSlugTip,
  submitButtonLabel = "Salvar alterações"
}: CatalogFormProps) {
  const methods = useForm<FormValues>({
    resolver: zodResolver(catalogSchema),
    defaultValues: {
      name: "",
      slug: "",
      isPublished: true
    }
  });

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(console.log)} className="space-y-8">
        <FormField
          name="name"
          control={methods.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>

              <FormControl>
                <Input
                  placeholder="Ex: Meu Catálogo"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
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
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>Dica importante!</AlertTitle>
            <AlertDescription>
              Evite mudar o slug com frequência. Se você alterar o slug, o link atual vai parar de funcionar e seus clientes precisarão acessar com o novo link.
            </AlertDescription>
          </Alert>
        )}

        <FormField
          name="slug"
          control={methods.control}
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
          control={methods.control}
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
                  Públicos são visíveis para qualquer pessoa,
                  enquanto não publicado só podem se acessado por você.
                  Não publicar pode ser útil enquanto você configura tudo.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit">
          {submitButtonLabel}
        </Button>
      </form>
    </Form>
  )
}
