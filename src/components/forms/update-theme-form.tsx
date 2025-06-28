"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Company, Theme } from "@/types/api-types";
import { updateThemeAction } from "@/actions/update-theme-action";
import { themeSchema } from "@/actions/schema";
import { routes } from "@/routes";
import { useRouter } from "next/navigation";
import { ThemeForm } from "./theme-form";

export function UpdateThemeForm({
  theme,
  company,
  callbackUrl,
}: {
  theme: Theme
  company?: Company
  callbackUrl?: string
}) {
  const router = useRouter();

  const { form, handleSubmitWithAction } = useHookFormAction(
    updateThemeAction,
    zodResolver(themeSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          primaryColor: theme.primaryColor,
          secondaryColor: theme.secondaryColor,
          logo: theme.logo ? {
            fileName: theme.logo.url.split("/").pop(),
            originalFileName: theme.logo.name,
            height: theme.logo.height,
            width: theme.logo.width,
            accessUrl: theme.logo.url,
          } : null,
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success(`Sucesso! ${!callbackUrl ? "Voltando para Página Inicial..." : "Redirecionando..."}`, {
            description: res.data?.message,
          });
          router.push(callbackUrl || routes.theme.url);
        },
        onError: (e) => {
          const { serverError } = e.error;

          if (serverError) {
            toast.error("Ops! Algo deu errado", {
              description: serverError.message,
            });
          }
        },
      },
    },
  );

  return (
    <ThemeForm
      form={form}
      company={company}
      onSubmit={handleSubmitWithAction}
      submitButtonLabel="Salvar alterações"
    />
  );
}
