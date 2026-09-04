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
import { updateCatalogItemAction } from "@/actions/update-catalog-item-action";
import type { Category, Prisma, ProductType } from "@/generated/prisma/client";
import { routes } from "@/routes";
import { updateCatalogItemSchema } from "@/schemas/catalog-item";
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
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";

type CatalogItemRaw = Prisma.CatalogItemGetPayload<{
  include: {
    categories: true;
    productType: true;
    images: true;
  };
}>;

type CatalogItem = Omit<CatalogItemRaw, "price"> & {
  price: string | null;
};

type UpdateCatalogItemFormProps = {
  catalogItem: CatalogItem;
  categories: Category[];
  productTypes: ProductType[];
};

export function UpdateCatalogItemForm({
  catalogItem,
  categories,
  productTypes,
}: UpdateCatalogItemFormProps) {
  const router = useRouter();

  const { form, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(
      updateCatalogItemAction,
      zodResolver(updateCatalogItemSchema),
      {
        formProps: {
          mode: "onChange",
          values: {
            id: catalogItem.id,
            title: catalogItem.title,
            caption: catalogItem.caption ?? "",
            price: catalogItem.price ?? "",
            productTypeId: catalogItem.productTypeId,
            categoryIds: catalogItem.categories.map((category) => category.id),
            images: catalogItem.images.map((image) => ({
              fileName: image.name,
              url: image.url,
              size: Number(image.size),
              width: image.width,
              height: image.height,
              altText: image.altText,
              position: image.position,
            })),
            isDisabled: catalogItem.disabledAt !== null,
          },
        },
        actionProps: {
          onSuccess: ({ input }) => {
            toast.add({
              type: "success",
              description: "Alterações salvas!",
            });
            resetFormAndAction();
            form.reset(input);
            router.push(routes.catalogItems.url);
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
            Salvando...
          </>
        ) : (
          "Salvar alterações"
        )}
      </Button>
    </form>
  );
}
