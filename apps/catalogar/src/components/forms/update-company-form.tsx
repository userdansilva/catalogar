"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CompanyForm } from "./company-form";
import { updateCompanyAction } from "@/actions/update-company-action";
import { companySchema } from "@/actions/schema";
import { toastServerError } from "@/utils/toast-server-error";
import { Company } from "@/services/get-user";
import { routes } from "@/routes";

type UpdateCompanyFormProps = {
  company: Company;
  callbackUrl?: string;
};

export function UpdateCompanyForm({
  company,
  callbackUrl,
}: UpdateCompanyFormProps) {
  const router = useRouter();

  const { form, handleSubmitWithAction } = useHookFormAction(
    updateCompanyAction,
    zodResolver(companySchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: company,
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
    <CompanyForm
      form={form}
      onSubmit={handleSubmitWithAction}
      submitButtonLabel="Salvar alterações"
    />
  );
}
