"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@catalogar/ui/components/field";
import { Input } from "@catalogar/ui/components/input";
import { Textarea } from "@catalogar/ui/components/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { createCompanyAction } from "@/actions/create-company-action";
import { routes } from "@/routes";
import { createCompanySchema } from "@/schemas/company";
import { formatPhone } from "@/utils/format-phone";
import { Button } from "../inputs/button";

type CreateCompanyFormProps = {
  callbackUrl?: string;
};

export function CreateCompanyForm({ callbackUrl }: CreateCompanyFormProps) {
  const router = useRouter();

  const { form, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(createCompanyAction, zodResolver(createCompanySchema), {
      formProps: {
        mode: "onChange",
        defaultValues: {
          name: "",
          slogan: "",
          description: "",
          mainSiteUrl: "",
          phoneNumber: "",
          businessTypeDescription: "",
        },
      },
      actionProps: {
        onSuccess: ({ input }) => {
          toast.success("Informações salvas!");
          resetFormAndAction();
          form.reset(input);
          router.push(callbackUrl || routes.dashboard.url);
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
    <form onSubmit={handleSubmitWithAction} className="space-y-8">
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Nome do negócio</FieldLabel>
            <Input
              id={field.name}
              aria-invalid={fieldState.invalid}
              disabled={form.formState.isSubmitting}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              {...field}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="slogan"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Slogan (Recomendado)</FieldLabel>
            <Input
              id={field.name}
              aria-invalid={fieldState.invalid}
              disabled={form.formState.isSubmitting}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              placeholder="Ex.: Melhor loja de pipas e acessórios em SP"
              {...field}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="phoneNumber"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Whatsapp (Recomendado)</FieldLabel>
            <Input
              id={field.name}
              aria-invalid={fieldState.invalid}
              disabled={form.formState.isSubmitting}
              placeholder="Ex.: (11) 91234-5678"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              inputMode="numeric"
              {...field}
              onChange={(e) => field.onChange(formatPhone(e.target.value))}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Descrição (Opcional)</FieldLabel>
            <Textarea
              id={field.name}
              aria-invalid={fieldState.invalid}
              className="resize-none"
              rows={4}
              {...field}
            />
            <FieldDescription>
              Fale brevemente sobre seu trabalho. Isso ajuda seus clientes a
              entenderem melhor o que você vende.
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="mainSiteUrl"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Link para contato (Opcional)
            </FieldLabel>
            <Input
              id={field.name}
              aria-invalid={fieldState.invalid}
              disabled={form.formState.isSubmitting}
              placeholder="Ex.: https://minha-empresa.com.br/"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              {...field}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            <FieldDescription>
              Qual o link do seu site? Caso ainda não tenha um site, você pode
              usar o link do Instagram, Linktree ou qualquer outro link que
              ajude seus clientes a entrar em contato.
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
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
  );
}
