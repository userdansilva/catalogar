"use client";

import { companySchema } from "@/actions/schema";
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";
import { Textarea } from "@/shadcn/components/ui/textarea";
import { FormEventHandler } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "../inputs/button";

export type CompanyFormValues = z.infer<typeof companySchema>;

type CompanyFormProps = {
  form: UseFormReturn<CompanyFormValues>
  onSubmit: FormEventHandler<HTMLFormElement>
  submitButtonLabel: string
}

export function CompanyForm({
  form,
  onSubmit,
  submitButtonLabel = "Salvar alterações",
}: CompanyFormProps) {
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
                  placeholder="Ex.: Catalogar ou Catalogar - O Melhor Sistema de Catálogos!"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  {...field}
                />
              </FormControl>

              <FormDescription>
                Qual o nome da sua empresa? Você pode aproveitar para colocar seu slogan.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição (Recomendado)</FormLabel>

              <FormControl>
                <Textarea
                  placeholder="Ex.: O Catalogar é uma plataforma simples e eficiente
                  pra mostrar seus produtos de um jeito visual e organizado.
                  Você pode montar catálogos com filtros por produto e categoria,
                  facilitando a navegação e ajudando seus clientes a encontrar exatamente
                  o que estão procurando."
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>

              <FormDescription>
                Fale brevemente sobre sua empresa.
                Isso ajuda seus clientes a se conectarem com o seu empresa.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="mainSiteUrl"
          control={form.control}
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site oficial (Recomendado)</FormLabel>

              <FormControl>
                <Input
                  placeholder="Ex.: https://catalogar.com.br/"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  {...field}
                />
              </FormControl>

              <FormDescription>
                Qual o link do seu site? Caso ainda não tenha, você pode usar o link
                do Instagram, Linktree, WhatsApp ou qualquer outro link que ajude seus clientes a
                saberem mais sobre seu empresa.
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
