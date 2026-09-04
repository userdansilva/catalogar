"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, Watch } from "react-hook-form";
import { publishCatalogAction } from "@/actions/publish-catalog-action";
import type { Catalog } from "@/generated/prisma/client";
import { routes } from "@/routes";
import { publishCatalogSchema } from "@/schemas/catalog";
import { toast } from "../ui/toast";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

type PublishCatalogFormProps = {
  currentCatalog: Catalog;
};

export function PublishCatalogForm({
  currentCatalog,
}: PublishCatalogFormProps) {
  const router = useRouter();

  const { form, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(publishCatalogAction, zodResolver(publishCatalogSchema), {
      formProps: {
        mode: "onChange",
        values: {
          slug: currentCatalog.slug ?? "",
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.add({
            type: "success",
            description: "Catálogo Publicado!!",
          });
          resetFormAndAction();
          router.push(routes.catalog.sub.published.url);
        },
        onError: (e) => {
          const { serverError } = e.error;

          if (serverError) {
            toast.add({
              type: "error",
              description: serverError.message,
            });
          }
        },
      },
    });

  return (
    <form onSubmit={handleSubmitWithAction} className="space-y-6">
      <Controller
        name="slug"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="space-y-2">
            <FieldLabel>Link customizado</FieldLabel>
            <div className="flex">
              <div className="bg-muted text-muted-foreground flex h-9 items-center rounded-l-md border border-r-0 px-3 py-2 text-sm">
                {`${process.env.NEXT_PUBLIC_BASE_URL}/@`}
              </div>
              <div className="flex-1">
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  className="rounded-l-none"
                  placeholder="minha-empresa"
                  disabled={form.formState.isSubmitting}
                />
              </div>
            </div>
            <FieldDescription>
              Apenas letras minúsculas, números e hífens são permitidos
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Seu link customizado</CardTitle>

          <CardDescription>
            <Watch
              control={form.control}
              name={["slug"]}
              render={([slug]) =>
                slug
                  ? `${process.env.NEXT_PUBLIC_BASE_URL}/@${slug}`
                  : "Defina um link customizado para ver seu link"
              }
            />
          </CardDescription>
        </CardHeader>
      </Card>

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="w-full"
      >
        {form.formState.isSubmitting ? (
          <>
            <Spinner data-icon="inline-start" />
            Publicando...
          </>
        ) : (
          <>
            <Rocket />
            Publicar Catálogo
          </>
        )}
      </Button>
    </form>
  );
}
