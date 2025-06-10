"use client";

import { themeSchema } from "@/actions/schema";
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";
import { FormEventHandler } from "react";
import { Control, UseFormReturn, useWatch } from "react-hook-form";
import { z } from "zod";
import {
  Card, CardContent,
} from "@/shadcn/components/ui/card";
import { Menu } from "lucide-react";
import Image from "next/image";
import { Button } from "../inputs/button";
import { InputLogo } from "../inputs/input-logo";

export type ThemeFormValues = z.infer<typeof themeSchema>;

type ThemePreviewProps = {
  control: Control<ThemeFormValues>
}

function ThemePreview({
  control,
}: ThemePreviewProps) {
  const {
    primaryColor, secondaryColor, logo,
  } = useWatch({ control });

  return (
    <Card
      style={{ color: secondaryColor, background: primaryColor }}
      className="flex items-center gap-4 rounded-sm p-4"
    >
      <Menu className="size-4" />
      {logo
        && logo.fileName
        && logo.originalFileName
        && logo.width
        && logo.height
        && logo.accessUrl
        ? (
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
          <span className="flex-1 font-semibold">SUA LOGO</span>
        )}

      <span className="text-sm">Saiba mais</span>
    </Card>
  );
}

type ThemeFormProps = {
  form: UseFormReturn<ThemeFormValues>
  onSubmit: FormEventHandler<HTMLFormElement>
  submitButtonLabel: string
}

export function ThemeForm({
  form,
  onSubmit,
  submitButtonLabel = "Salvar alterações",
}: ThemeFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          name="logo"
          control={form.control}
          disabled={form.formState.isSubmitting}
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel>Logo da empresa</FormLabel>

              <FormControl>
                <InputLogo
                  onChange={onChange}
                  value={value}
                />
              </FormControl>

              <FormDescription>
                Formatos recomendados: SVG (melhor qualidade), PNG sem fundo ou JPG.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <span className="text-sm font-medium">Pré-visualização</span>
          <ThemePreview control={form.control} />
          <span className="text-[0.8rem] text-muted-foreground">
            Aqui você tem uma ideia de como a logo e as cores vão aparecer no seu catálogo.
          </span>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <FormField
            name="primaryColor"
            control={form.control}
            disabled={form.formState.isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor de fundo</FormLabel>

                <FormControl>
                  <Input
                    type="color"
                    className="w-full"
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
            disabled={form.formState.isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor do texto</FormLabel>

                <FormControl>
                  <Input
                    type="color"
                    className="w-full"
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
