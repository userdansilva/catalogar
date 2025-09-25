"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@catalogar/ui/components/form";
import { Card, CardContent } from "@catalogar/ui/components/card";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Input } from "@catalogar/ui/components/input";
import { InputLogo } from "../inputs/input-logo";
import { Button } from "../inputs/button";
import { updateThemeAction } from "@/actions/update-theme-action";
import { toastServerError } from "@/utils/toast-server-error";
import { Company, Theme } from "@/services/get-user";
import { routes } from "@/routes";
import { updateThemeSchema } from "@/schemas/theme";

export function UpdateThemeForm({
  theme,
  company,
  callbackUrl,
}: {
  theme: Theme;
  company?: Company;
  callbackUrl?: string;
}) {
  const router = useRouter();

  const { form, handleSubmitWithAction } = useHookFormAction(
    updateThemeAction,
    zodResolver(updateThemeSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: theme,
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success("Alterações salvas!", {
            description: res.data.message,
          });
          router.push(callbackUrl || routes.dashboard.url);
        },
        onError: (e) => {
          const { serverError } = e.error;

          if (serverError) {
            toastServerError(serverError);
          }
        },
      },
    },
  );

  const [primaryColor, secondaryColor, logo] = form.watch([
    "primaryColor",
    "secondaryColor",
    "logo",
  ]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-8">
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
                <span className="block">
                  Formatos: SVG (melhor qualidade), PNG sem fundo ou JPG. (Dica:
                  Use{" "}
                  <a
                    href="https://convertio.co/pt/"
                    target="_blank"
                    className="underline underline-offset-2"
                  >
                    Convertio.co
                  </a>{" "}
                  para alterar o formato).
                </span>
                <span className="block">
                  Tamanho máximo: 1MB. (Dica: Use{" "}
                  <a
                    href="https://tinypng.com/"
                    target="_blank"
                    className="underline underline-offset-2"
                  >
                    TinyPNG
                  </a>{" "}
                  para otimizar imagem).
                </span>
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <span className="text-sm font-medium">Pré-visualização</span>
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
