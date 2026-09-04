"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { createCatalogItemAction } from "@/actions/create-catalog-item-action";
import type { Category, ProductType } from "@/generated/prisma/client";
import { routes } from "@/routes";
import { createCatalogItemSchema } from "@/schemas/catalog-item";
import { InputImages } from "../inputs/input-images";
import { toast } from "../ui/toast";
import { Controller } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useEffect, useMemo } from "react";

type CreateCatalogItemFormProps = {
  categories: Category[];
  productTypes: ProductType[];
  callbackUrl?: string;
};

export function CreateCatalogItemForm({
  categories,
  productTypes,
  callbackUrl,
}: CreateCatalogItemFormProps) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      title: "",
      caption: "",
      productTypeId:
        productTypes.length === 1 && productTypes[0]?.id
          ? productTypes[0].id
          : "",
      images: [],
      price: "",
      categoryIds: [],
    }),
    [productTypes],
  );

  const {
    form: { reset, ...form },
    handleSubmitWithAction,
    resetFormAndAction,
  } = useHookFormAction(
    createCatalogItemAction,
    zodResolver(createCatalogItemSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues,
      },
      actionProps: {
        onSuccess: ({ input }) => {
          toast.add({
            type: "success",
            description: "Item de catálogo adicionado!",
          });
          /**
           * @see CreateCategoryForm
           */
          resetFormAndAction();
          /**
           * @see CreateCategoryForm
           */
          reset(input);
          router.push(callbackUrl || routes.catalogItems.url);
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
    },
  );

  useEffect(() => {
    /**
     * @see CreateCategoryForm
     */
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmitWithAction} className="space-y-8">
      <Controller
        name="images"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Imagens</FieldLabel>

            <InputImages {...field} disabled={form.formState.isSubmitting} />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

            <ul className="text-muted-foreground text-sm">
              <li>
                As imagens serão exibidas na ordem em que forem adicionadas.
              </li>
              <li>
                Formatos: JPG (recomendado), PNG ou WEBP. (Dica: Use{" "}
                <a
                  href="https://convertio.co/pt/"
                  target="_blank"
                  className="underline underline-offset-2"
                  rel="noopener"
                >
                  Convertio.co
                </a>{" "}
                para alterar o formato).
              </li>
              <li>
                Tamanho máximo: 5MB. (Dica: Use{" "}
                <a
                  href="https://tinyjpg.com/"
                  target="_blank"
                  className="underline underline-offset-2"
                  rel="noopener"
                >
                  TinyJPG
                </a>{" "}
                para otimizar imagem).
              </li>
            </ul>
          </Field>
        )}
      />

      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Título</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              disabled={form.formState.isSubmitting}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="caption"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Legenda (Recomendado)</FieldLabel>
            <Textarea
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Descreva o item..."
              className="resize-none"
              disabled={form.formState.isSubmitting}
            />
            <FieldDescription>
              Aproveite para incluir palavras-chave que ajude seus clientes a
              encontrarem esse item mais facilmente.
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="price"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Preço (Opcional)</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              placeholder="Ex: 99,90"
              disabled={form.formState.isSubmitting}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="productTypeId"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} orientation="responsive">
            <FieldContent>
              <FieldLabel htmlFor={`form-rhf-select-${field.name}`}>
                Tipo de Produto
              </FieldLabel>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </FieldContent>
            <Select
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
              items={productTypes.map((productType) => ({
                label: productType.name,
                value: productType.id,
              }))}
            >
              <SelectTrigger
                id={`form-rhf-select-${field.name}`}
                aria-invalid={fieldState.invalid}
                className="w-full"
              >
                <SelectValue placeholder="Selecione o tipo de produto" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipo de produto</SelectLabel>
                  {productTypes
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((productType) => (
                      <SelectItem value={productType.id} key={productType.id}>
                        {productType.name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        )}
      />

      <Controller
        name="categoryIds"
        control={form.control}
        render={({ field, fieldState }) => (
          <FieldSet>
            <FieldLegend variant="label">Categorias (Recomendado)</FieldLegend>
            <FieldDescription>
              As categorias ajudam seus clientes a encontrar esse item mais
              facilmente pelos filtros.
            </FieldDescription>
            {categories.length >= 1 ? (
              <FieldGroup data-slot="checkbox-group">
                {categories.map((category) => (
                  <Field
                    key={category.id}
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                  >
                    <Checkbox
                      id={`form-rhf-checkbox-${category.id}`}
                      name={field.name}
                      aria-invalid={fieldState.invalid}
                      checked={field.value.includes(category.id)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...field.value, category.id]
                          : field.value.filter(
                              (value) => value !== category.id,
                            );
                        field.onChange(newValue);
                      }}
                    />
                    <FieldLabel
                      htmlFor={`form-rhf-checkbox-${category.id}`}
                      className="font-normal"
                    >
                      {category.name}
                    </FieldLabel>
                  </Field>
                ))}
              </FieldGroup>
            ) : (
              "Nenhuma categoria adicionada"
            )}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldSet>
        )}
      />

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? (
          <>
            <Spinner data-icon="inline-start" />
            Adicionando...
          </>
        ) : (
          "Adicionar"
        )}
      </Button>
    </form>
  );
}
