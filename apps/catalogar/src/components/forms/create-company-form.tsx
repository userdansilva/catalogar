"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CompanyForm } from "./company-form";
import { routes } from "@/routes";
import { companySchema } from "@/actions/schema";
import { createCompanyAction } from "@/actions/create-company-action";
import { toastServerError } from "@/utils/toast-server-error";

export type CompanyFormValues = z.infer<typeof companySchema>;

export function CreateCompanyForm({ callbackUrl }: { callbackUrl?: string }) {
  const router = useRouter();

  const { form, handleSubmitWithAction } = useHookFormAction(
    createCompanyAction,
    zodResolver(companySchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          name: "",
          description: "",
          mainSiteUrl: "",
          phoneNumber: "",
          businessTypeDescription: "",
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success("Informações salvas!", {
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
    <CompanyForm
      form={form}
      onSubmit={handleSubmitWithAction}
      submitButtonLabel="Salvar informações"
    />
  );
}
