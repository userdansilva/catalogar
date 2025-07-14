"use client";

import { FormEventHandler } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "../inputs/button";
import { companySchema } from "@/actions/schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";
import { Textarea } from "@/shadcn/components/ui/textarea";

export type CompanyFormValues = z.infer<typeof companySchema>;

export function CompanyForm({
  form,
  onSubmit,
  submitButtonLabel = "Salvar alterações",
}: {
  form: UseFormReturn<CompanyFormValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  submitButtonLabel: string;
}) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da empresa</FormLabel>

              <FormControl>
                <Input
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>

              <FormDescription>
                Você também pode colocar seu slogan (Ex.: Catalogar - O Melhor
                Sistema de Catálogos).
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição (Opcional)</FormLabel>

              <FormControl>
                <Textarea
                  className="resize-none"
                  rows={4}
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>

              <FormDescription>
                Fale brevemente sobre sua empresa. Isso ajuda seus clientes a
                entenderem melhor o que você vende.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="mainSiteUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site oficial (Opcional)</FormLabel>

              <FormControl>
                <Input
                  placeholder="Ex.: https://minha-empresa.com.br/"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>

              <FormDescription>
                Qual o link do seu site? Caso ainda não tenha um site, você pode
                usar o link do Instagram, Linktree, WhatsApp ou qualquer outro
                link que ajude seus clientes a entrar em contato.
              </FormDescription>

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
