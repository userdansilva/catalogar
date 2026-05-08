"use client";

import { Card, CardContent } from "@catalogar/ui/components/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@catalogar/ui/components/form";
import { Input } from "@catalogar/ui/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Watch } from "react-hook-form";
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
          console.log("theme", theme);
          toast.success("Alterações salvas!");
          resetFormAndAction();
          form.reset({
            logo: theme.logo ?? null,
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
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-8">
        <FormField
          name="logo"
          control={form.control}
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel>Logo (Recomendado)</FormLabel>

              <FormControl>
                <InputLogo
                  onChange={onChange}
                  value={value}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>

              <FormDescription>
                Dica: use SVG para melhor qualidade, ou PNG sem fundo, ou JPG.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <span className="text-sm font-medium">Pré-visualização</span>

          <Watch
            control={form.control}
            names={["logo", "primaryColor", "secondaryColor"]}
            render={([logo, primaryColor, secondaryColor]) => (
              <Card
                style={{
                  color: secondaryColor,
                  background: primaryColor,
                }}
                className="flex flex-row items-center gap-4 rounded-sm p-4"
              >
                {logo?.width && logo.height && logo.url ? (
                  <CardContent className="h-7 flex-1">
                    <Image
                      src={logo.url}
                      alt="logo"
                      height={logo.height}
                      width={logo.width}
                      style={{ height: 28, width: "auto" }}
                      unoptimized
                    />
                  </CardContent>
                ) : (
                  <span className="flex-1 font-semibold">
                    {company ? company.name : "SUA LOGO"}
                  </span>
                )}

                <Button variant="ghost">
                  <Menu className="size-4" />
                  Menu
                </Button>
              </Card>
            )}
          />

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
          Salvar alterações
        </Button>
      </form>
    </Form>
  );
}
