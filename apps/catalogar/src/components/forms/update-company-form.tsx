"use client";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@catalogar/ui/components/form";
import { Input } from "@catalogar/ui/components/input";
import { Textarea } from "@catalogar/ui/components/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateCompanyAction } from "@/actions/update-company-action";
import type { Company } from "@/generated/prisma/client";
import { updateCompanySchema } from "@/schemas/company";
import { Button } from "../inputs/button";

type UpdateCompanyFormProps = {
  company: Company;
  callbackUrl?: string;
};

export function UpdateCompanyForm({
  company,
  callbackUrl,
}: UpdateCompanyFormProps) {
  const router = useRouter();

  const { form, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(updateCompanyAction, zodResolver(updateCompanySchema), {
      formProps: {
        mode: "onChange",
        defaultValues: {
          name: company.name,
          description: company.description ?? "",
          mainSiteUrl: company.mainSiteUrl ?? "",
          phoneNumber: company.phoneNumber ?? "",
          businessTypeDescription: company.businessTypeDescription ?? "",
        },
      },
      actionProps: {
        onSuccess: ({ data: { company } }) => {
          toast.success("Alterações salvas!");
          resetFormAndAction();
          form.reset({
            name: company.name,
            description: company.description ?? "",
            mainSiteUrl: company.mainSiteUrl ?? "",
            phoneNumber: company.phoneNumber ?? "",
            businessTypeDescription: company.businessTypeDescription ?? "",
          });
          if (callbackUrl) {
            router.push(callbackUrl);
          } else {
            router.refresh();
          }
        },
        onError: (e) => {
          const { serverError } = e.error;

          if (serverError) {
            toast.error(serverError.message);
          }
        },
      },
    });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-8">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do negócio</FormLabel>

              <FormControl>
                <Input
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>

              <FormDescription>Como quer ser reconhecido?</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição (Recomendado)</FormLabel>

              <FormControl>
                <Textarea
                  className="resize-none"
                  rows={4}
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>

              <FormDescription>
                Fale brevemente sobre seu trabalho. Isso ajuda seus clientes a
                entenderem melhor o que você vende.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="mainSiteUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link para contato (Recomendado)</FormLabel>

              <FormControl>
                <Input
                  placeholder="Ex.: https://minha-empresa.com.br/"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>

              <FormDescription>
                Qual o link do seu site? Caso ainda não tenha um site, você pode
                usar o link do Instagram, Linktree ou qualquer outro link que
                ajude seus clientes a entrar em contato.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="phoneNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Whatsapp (Recomendado)</FormLabel>

              <FormControl>
                <Input
                  placeholder="Ex.: (11) 91234-5678"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  inputMode="numeric"
                  disabled={form.formState.isSubmitting}
                  {...field}
                  onChange={(e) => field.onChange(formatPhone(e.target.value))}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          loading={form.formState.isSubmitting}
        >
          Salvar alterações
        </Button>
      </form>
    </Form>
  );
}
