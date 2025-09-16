"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { ThemeForm } from "./theme-form";
import { updateThemeAction } from "@/actions/update-theme-action";
import { themeSchema } from "@/actions/schema";
import { toastServerError } from "@/utils/toast-server-error";
import { Company, Theme } from "@/services/get-user";

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
    zodResolver(themeSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: theme,
      },
      actionProps: {
        onSuccess: () => {
          if (callbackUrl) {
            toast.success("Alterações salvas! Redirecionando...");
            router.push(callbackUrl);
          }

          toast.success("Alterações salvas!");
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

  return (
    <ThemeForm
      form={form}
      company={company}
      onSubmit={handleSubmitWithAction}
      submitButtonLabel="Salvar alterações"
    />
  );
}
