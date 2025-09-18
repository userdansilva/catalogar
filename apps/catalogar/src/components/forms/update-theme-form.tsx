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
import { routes } from "@/routes";

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

  return (
    <ThemeForm
      form={form}
      company={company}
      onSubmit={handleSubmitWithAction}
      submitButtonLabel="Salvar alterações"
    />
  );
}
