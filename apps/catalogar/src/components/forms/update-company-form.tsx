"use client";

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
import { routes } from "@/routes";
import { type Company, updateCompanySchema } from "@/schemas/company";
import { toastServerError } from "@/utils/toast-server-error";
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

  const { form, handleSubmitWithAction } = useHookFormAction(
    updateCompanyAction,
    zodResolver(updateCompanySchema),
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
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-8">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da empresa</FormLabel>

              <FormControl>
                <Input
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>

              <FormDescription>
                Você também pode colocar seu slogan (Ex.: Catalogar - O Melhor
                Sistema de Catálogos).
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição (Opcional)</FormLabel>

              <FormControl>
                <Textarea
                  className="resize-none"
                  rows={4}
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>

              <FormDescription>
                Fale brevemente sobre sua empresa. Isso ajuda seus clientes a
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
              <FormLabel>Link para contato (Opcional)</FormLabel>

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
