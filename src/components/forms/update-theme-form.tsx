"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Theme } from "@/types/api-types";
import { updateThemeAction } from "@/actions/update-theme-action";
import { themeSchema } from "@/actions/schema";
import { routes } from "@/routes";
import { ThemeForm } from "./theme-form";

type UpdateThemeFormProps = {
  theme: Theme
  callbackUrl?: string
}

export function UpdateThemeForm({
  theme, callbackUrl,
}: UpdateThemeFormProps) {
  const { form, handleSubmitWithAction } = useHookFormAction(
    updateThemeAction,
    zodResolver(themeSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          primaryColor: theme.primaryColor,
          secondaryColor: theme.secondaryColor,
          logo: {
            fileName: theme.logo?.url.split("/").pop(),
            originalFileName: theme.logo?.name || "",
            height: theme.logo?.height || 0,
            width: theme.logo?.width || 0,
            accessUrl: theme.logo?.url || "",
          },
          redirectTo: callbackUrl || routes.theme.url,
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success("Sucesso!", {
            description: res.data?.message,
          });
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
      onSubmit={handleSubmitWithAction}
      submitButtonLabel="Salvar alterações"
    />
  );
}
