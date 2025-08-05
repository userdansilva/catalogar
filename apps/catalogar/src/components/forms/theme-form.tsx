"use client";

import { FormEventHandler } from "react";
import { Control, UseFormReturn, useWatch } from "react-hook-form";
import { z } from "zod";
import { Menu } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@catalogar/ui/components/card";
import { Input } from "@catalogar/ui/components/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@catalogar/ui/components/form";
import { Button } from "../inputs/button";
import { InputLogo } from "../inputs/input-logo";
import { Company } from "@/types/api-types";
import { themeSchema } from "@/actions/schema";

export type ThemeFormValues = z.infer<typeof themeSchema>;

function ThemePreview({
  control,
  company,
}: {
  control: Control<ThemeFormValues>;
  company?: Company;
}) {
  const { primaryColor, secondaryColor, logo } = useWatch({ control });

  return (
    <Card
      style={{ color: secondaryColor, background: primaryColor }}
      className="flex items-center gap-4 rounded-sm p-4"
    >
      <Menu className="size-4" />
      {logo &&
      logo.fileName &&
      logo.originalFileName &&
      logo.width &&
      logo.height &&
      logo.accessUrl ? (
        <CardContent className="h-7 flex-1">
          <Image
            src={logo.accessUrl}
            width={logo.width / 3}
            height={logo.height / 3}
            alt="Logo"
            style={{ objectFit: "contain" }}
            unoptimized
          />
        </CardContent>
      ) : (
        <span className="flex-1 font-semibold">
          {company ? company.name : "SUA LOGO"}
        </span>
      )}

      <span className="text-sm">Menu</span>
    </Card>
  );
}

export function ThemeForm({
  form,
  onSubmit,
  submitButtonLabel = "Salvar alterações",
  company,
}: {
  form: UseFormReturn<ThemeFormValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  submitButtonLabel: string;
  company?: Company;
}) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          name="logo"
          control={form.control}
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel>Logo da empresa (Opcional)</FormLabel>

              <FormControl>
                <InputLogo
                  onChange={onChange}
                  value={value ?? undefined}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>

              <FormDescription>
                <ul>
                  <li>
                    Formatos: SVG (melhor qualidade), PNG sem fundo ou JPG.
                    (Dica: Use{" "}
                    <a
                      href="https://convertio.co/pt/"
                      target="_blank"
                      className="underline underline-offset-2"
                    >
                      Convertio.co
                    </a>{" "}
                    para alterar o formato).
                  </li>
                  <li>
                    Tamanho máximo: 1MB. (Dica: Use{" "}
                    <a
                      href="https://tinypng.com/"
                      target="_blank"
                      className="underline underline-offset-2"
                    >
                      TinyPNG
                    </a>{" "}
                    para otimizar imagem).
                  </li>
                </ul>
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <span className="text-sm font-medium">Pré-visualização</span>
          <ThemePreview control={form.control} company={company} />
          <span className="text-muted-foreground text-[0.8rem]">
            Aqui você tem uma ideia de como a logo e as cores vão aparecer no
            seu catálogo.
          </span>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <FormField
            name="primaryColor"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor de fundo</FormLabel>

                <FormControl>
                  <Input
                    type="color"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>

                <FormDescription>
                  Escolha uma cor que ajude a destacar sua logo.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="secondaryColor"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor do texto</FormLabel>

                <FormControl>
                  <Input
                    type="color"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>

                <FormDescription>
                  Escolha uma cor que se destaque na cor de fundo.
                </FormDescription>

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
