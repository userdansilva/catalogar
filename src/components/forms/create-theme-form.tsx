"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { routes } from "@/routes";
import { themeSchema } from "@/actions/schema";
import { createThemeAction } from "@/actions/create-theme-action";
import { ThemeForm } from "./theme-form";

export type ThemeFormValues = z.infer<typeof themeSchema>

export function CreateThemeForm({
  callbackUrl,
}: {
  callbackUrl?: string
}) {
  const { form, handleSubmitWithAction } = useHookFormAction(
    createThemeAction,
    zodResolver(themeSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          primaryColor: "#390080",
          secondaryColor: "#70FF94",
          logo: {
            fileName: "",
            originalFileName: "",
            height: 0,
            width: 0,
            accessUrl: "",
          },
          redirectTo: callbackUrl || routes.dashboard.url,
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success(`Sucesso! ${!callbackUrl ? "Voltando para a lista..." : "Redirecionando..."}`, {
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
      submitButtonLabel="Cadastrar Tema"
    />
  );
}
