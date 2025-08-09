"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CompanyForm } from "./company-form";
import { Company } from "@/types/api-types";
import { updateCompanyAction } from "@/actions/update-company-action";
import { companySchema } from "@/actions/schema";

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
            toast.error("Ops! Algo deu errado", {
              description: serverError.message,
            });
          }
        },
      },
    }
  );

  return (
    <CompanyForm
      form={form}
      onSubmit={handleSubmitWithAction}
      submitButtonLabel="Salvar alterações"
    />
  );
}
