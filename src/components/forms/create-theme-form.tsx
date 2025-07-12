"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { routes } from "@/routes";
import { themeSchema } from "@/actions/schema";
import { createThemeAction } from "@/actions/create-theme-action";
import { Company } from "@/types/api-types";
import { useRouter } from "next/navigation";
import { ThemeForm } from "./theme-form";

export type ThemeFormValues = z.infer<typeof themeSchema>;

export function CreateThemeForm({
  callbackUrl,
  company,
}: {
  callbackUrl?: string;
  company?: Company;
}) {
  const router = useRouter();

  const { form, handleSubmitWithAction } = useHookFormAction(
    createThemeAction,
    zodResolver(themeSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          primaryColor: "#390080",
          secondaryColor: "#70FF94",
          logo: null,
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success(
            `Sucesso! ${!callbackUrl ? "Voltando para Página Inicial..." : "Redirecionando..."}`,
            {
              description: res.data?.message,
            },
          );
          router.push(callbackUrl || routes.dashboard.url);
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
      submitButtonLabel="Cadastrar Tema"
    />
  );
}
