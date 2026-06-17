"use client";

import { Card, CardContent } from "@catalogar/ui/components/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@catalogar/ui/components/field";
import { Input } from "@catalogar/ui/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, Watch } from "react-hook-form";
import { toast } from "sonner";
import { updateThemeAction } from "@/actions/update-theme-action";
import type { Company, Prisma } from "@/generated/prisma/client";
import { updateThemeSchema } from "@/schemas/theme";
import { Button } from "../inputs/button";
import { InputLogo } from "../inputs/input-logo";

export function UpdateThemeForm({
  theme,
  company,
  callbackUrl,
}: {
  theme: Prisma.ThemeGetPayload<{
    include: { logo: true };
  }>;
  company?: Company | null;
  callbackUrl?: string;
}) {
  const router = useRouter();

  const { form, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(updateThemeAction, zodResolver(updateThemeSchema), {
      formProps: {
        mode: "onChange",
        defaultValues: {
          logo: theme.logo ?? null,
          primaryColor: theme.primaryColor,
          secondaryColor: theme.secondaryColor,
        },
      },
      actionProps: {
        onSuccess: ({ data: { theme } }) => {
          toast.success("Alterações salvas!");
          resetFormAndAction();
          form.reset({
            logo: theme.logo,
            primaryColor: theme.primaryColor,
            secondaryColor: theme.secondaryColor,
          });
          if (callbackUrl) {
            router.push(callbackUrl);
          } else {
            router.refresh();
          }
        },
        onError: (e) => {
          const { serverError } = e.error;

          if (serverError) {
            toast.error(serverError.message);
          }
        },
      },
    });

  return (
    <form onSubmit={handleSubmitWithAction} className="space-y-8">
      <Controller
        name="logo"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Logo (Recomendado)</FieldLabel>
            <InputLogo
              onChange={field.onChange}
              value={field.value}
              disabled={form.formState.isSubmitting}
            />
            <FieldDescription>
              Dica: use SVG para melhor qualidade, ou PNG sem fundo, ou JPG.
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="space-y-2">
        <span className="text-sm font-medium">Pré-visualização</span>

        <Watch
          control={form.control}
          name={["logo", "primaryColor", "secondaryColor"]}
          render={([logo, primaryColor, secondaryColor]) => (
            <Card
              style={{
                color: secondaryColor,
                background: primaryColor,
              }}
              className="flex flex-row items-center gap-4 rounded-sm py-1 px-4"
            >
              <div className="flex-1 flex items-center h-18">
                {logo?.width && logo.height && logo.url && (
                  <CardContent className="items-center size-16 flex relative mr-3">
                    <Image
                      src={logo.url}
                      alt="logo"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </CardContent>
                )}

                <div className="flex flex-col -space-y-0.5">
                  <div className="font-semibold text-lg">
                    {company?.name ?? "Nome da Loja"}
                  </div>
                  {company?.slogan && (
                    <div className="text-xs leading-tight line-clamp-2">
                      {company.slogan}
                    </div>
                  )}
                </div>
              </div>

              <Button variant="ghost" asChild>
                <div>
                  <Menu className="size-4" />
                  Menu
                </div>
              </Button>
            </Card>
          )}
        />

        <span className="text-muted-foreground text-[0.8rem]">
          Aqui você tem uma ideia de como a logo, nome, slogan e as cores vão
          aparecer no seu catálogo.
        </span>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <Controller
          name="primaryColor"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Cor de fundo</FieldLabel>
              <Input
                id={field.name}
                aria-invalid={fieldState.invalid}
                disabled={form.formState.isSubmitting}
                type="color"
                className="w-full"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="secondaryColor"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Cor do texto</FieldLabel>
              <Input
                id={field.name}
                aria-invalid={fieldState.invalid}
                disabled={form.formState.isSubmitting}
                type="color"
                className="w-full"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        loading={form.formState.isSubmitting}
      >
        Salvar alterações
      </Button>
    </form>
  );
}
