"use client";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldTitle,
} from "@catalogar/ui/components/field";
import { Input } from "@catalogar/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@catalogar/ui/components/select";
import { Switch } from "@catalogar/ui/components/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { updateCatalogAction } from "@/actions/update-catalog-action";
import type { Catalog } from "@/generated/prisma/client";
import { updateCatalogSchema } from "@/schemas/catalog";
import { Button } from "../inputs/button";

type UpdateCatalogFormProps = {
  catalog: Catalog;
  callbackUrl?: string;
};

export function UpdateCatalogForm({
  catalog,
  callbackUrl,
}: UpdateCatalogFormProps) {
  const router = useRouter();

  const { form, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(updateCatalogAction, zodResolver(updateCatalogSchema), {
      formProps: {
        mode: "onChange",
        defaultValues: {
          name: catalog.name,
          isPublished: catalog.publishedAt !== null,
          isCartEnabled: catalog.isCartEnabled,
          slug: catalog.slug ?? "",
        },
      },
      actionProps: {
        onSuccess: ({ data: { catalog, redirectTo }, input }) => {
          toast.success("Alterações salvas!");
          resetFormAndAction();

          if (redirectTo) {
            form.reset(input);
            router.push(redirectTo);
            return;
          }

          form.reset({
            name: catalog.name,
            isPublished: catalog.publishedAt !== null,
            isCartEnabled: catalog.isCartEnabled,
            slug: catalog.slug ?? "",
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
    <form onSubmit={handleSubmitWithAction} className="space-y-8">
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Nome</FieldLabel>
            <Input
              placeholder="Ex.: Meu Catálogo"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              disabled={form.formState.isSubmitting}
              {...field}
            />
            <FieldDescription>
              Esse nome aparecerá apenas para você.
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="isPublished"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Visibilidade</FieldLabel>
            <Select
              name={field.name}
              value={field.value ? "PUBLIC" : "PRIVATE"}
              onValueChange={(e) => {
                field.onChange(e === "PUBLIC");
              }}
              disabled={form.formState.isSubmitting}
            >
              <SelectTrigger
                className="w-full"
                aria-invalid={fieldState.invalid}
              >
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PUBLIC">
                  Público{" "}
                  <span className="text-muted-foreground">
                    (Todos podem visualizar)
                  </span>
                </SelectItem>
                <SelectItem value="PRIVATE">
                  Privado{" "}
                  <span className="text-muted-foreground">
                    (Apenas você pode visualizar)
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
            <FieldContent>
              {!catalog.slug && field.value && (
                <FieldDescription>
                  Após clicar em Salvar Alterações você será redirecionado para
                  a tela de publicação de catálogo.
                </FieldDescription>
              )}
            </FieldContent>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="slug"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Link customizado (Apenas catálogo público)</FieldLabel>
            <div className="flex">
              <div className="bg-muted text-muted-foreground flex h-9 items-center rounded-l-md border border-r-0 px-3 py-2 text-sm">
                {`${process.env.NEXT_PUBLIC_BASE_URL}/@`}
              </div>
              <div className="flex-1">
                <Input
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  className="rounded-l-none"
                  placeholder="minha-empresa"
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </div>
            </div>
            <FieldDescription>
              Apenas letras minúsculas, números e hífens são permitidos.
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="isCartEnabled"
        control={form.control}
        render={({ field, fieldState }) => (
          <FieldLabel htmlFor="form-rhf-switch-isCartEnabled">
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldTitle>Habilitar carrinho</FieldTitle>
                <FieldDescription>
                  Permite que clientes adicionem itens ao carrinho e feche o
                  pedido no WhatsApp. Necessário adicionar número de WhatsApp no
                  menu Empresa.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Switch
                id="form-rhf-switch-isCartEnabled"
                name={field.name}
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={form.formState.isSubmitting}
                aria-invalid={fieldState.invalid}
              />
            </Field>
          </FieldLabel>
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
  );
}
