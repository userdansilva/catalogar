"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@catalogar/ui/form";
import { Input } from "@catalogar/ui/input";
import { Textarea } from "@catalogar/ui/textarea";
import { Button } from "../inputs/button";
import { routes } from "@/routes";
import { createCompanyAction } from "@/actions/create-company-action";
import { toastServerError } from "@/utils/toast-server-error";
import { createCompanySchema } from "@/schemas/company";

export function CreateCompanyForm({ callbackUrl }: { callbackUrl?: string }) {
  const router = useRouter();

  const { form, handleSubmitWithAction } = useHookFormAction(
    createCompanyAction,
    zodResolver(createCompanySchema),
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
          Salvar informações
        </Button>
      </form>
    </Form>
  );
}
