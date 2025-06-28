"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { routes } from "@/routes";
import { companySchema } from "@/actions/schema";
import { createCompanyAction } from "@/actions/create-company-action";
import { useRouter } from "next/navigation";
import { CompanyForm } from "./company-form";

export type CompanyFormValues = z.infer<typeof companySchema>

export function CreateCompanyForm({
  callbackUrl,
}: {
  callbackUrl?: string
}) {
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
          toast.success(`Sucesso! ${!callbackUrl ? "Voltando para Página Inicial..." : "Redirecionando..."}`, {
            description: res.data?.message,
          });
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
    <CompanyForm
      form={form}
      onSubmit={handleSubmitWithAction}
      submitButtonLabel="Cadastrar Empresa"
    />
  );
}
