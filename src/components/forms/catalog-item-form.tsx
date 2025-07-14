"use client";

import { FormEventHandler } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "../inputs/button";
import { InputImages } from "../inputs/input-images";
import { catalogItemSchema } from "@/actions/schema";
import { Checkbox } from "@/shadcn/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";
import { Textarea } from "@/shadcn/components/ui/textarea";
import { Category, ProductType } from "@/types/api-types";

export type CatalogItemFormValues = z.infer<typeof catalogItemSchema>;

export function CatalogItemForm({
  form,
  onSubmit,
  submitButtonLabel,
  categories,
  productTypes,
}: {
  form: UseFormReturn<CatalogItemFormValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  submitButtonLabel: string;
  categories: Category[];
  productTypes: ProductType[];
}) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          name="images"
          control={form.control}
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel>Imagens</FormLabel>

              <FormControl>
                <InputImages
                  onChange={onChange}
                  value={value}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>

              <FormDescription>
                <ul>
                  <li>
                    As imagens serão exibidas na ordem em que forem adicionadas.
                  </li>
                  <li>
                    Formatos: JPG (recomendado), PNG ou WEBP. (Dica: Use{" "}
                    <a
                      href="https://convertio.co/pt/"
                      target="_blank"
                      className="underline underline-offset-2"
                    >
                      Convertio.co
                    </a>{" "}
                    para alterar o formato).
                  </li>
                  <li>
                    Tamanho máximo: 1MB. (Dica: Use{" "}
                    <a
                      href="https://tinyjpg.com/"
                      target="_blank"
                      className="underline underline-offset-2"
                    >
                      TinyJPG
                    </a>{" "}
                    para otimizar imagem).
                  </li>
                </ul>
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>

              <FormControl>
                <Input
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="caption"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Legenda (Opcional)</FormLabel>

              <FormControl>
                <Textarea
                  placeholder="Descreva o item..."
                  className="resize-none"
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>

              <FormDescription>
                Aproveite para incluir palavras-chave que ajudem seus clientes a
                encontrar esse item mais facilmente na busca.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="productTypeId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Produto</FormLabel>

              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={form.formState.isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de produto" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {productTypes
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((productType) => (
                      <SelectItem value={productType.id} key={productType.id}>
                        {productType.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="categoryIds"
          control={form.control}
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Categorias (Opcional)</FormLabel>

                <FormDescription>
                  As categorias ajudam seus clientes a encontrar esse item mais
                  facilmente pelos filtros.
                </FormDescription>
              </div>

              {categories.length >= 1 ? (
                <div className="flex flex-wrap gap-2">
                  {categories
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((category) => (
                      <FormField
                        key={category.id}
                        control={form.control}
                        name="categoryIds"
                        render={({ field }) => (
                          <FormItem
                            key={category.id}
                            className="flex flex-row items-start space-x-2 space-y-0 rounded-md border px-3 py-2"
                          >
                            <FormControl>
                              <Checkbox
                                disabled={form.formState.isSubmitting}
                                checked={field.value?.includes(category.id)}
                                onCheckedChange={(checked) =>
                                  checked
                                    ? field.onChange([
                                        ...(field.value || []),
                                        category.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== category.id,
                                        ),
                                      )
                                }
                              />
                            </FormControl>

                            <FormLabel className="cursor-pointer font-normal">
                              {category.name}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                </div>
              ) : (
                <div className="text-sm">Nenhuma categoria adicionada</div>
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          loading={form.formState.isSubmitting}
        >
          {submitButtonLabel}
        </Button>
      </form>
    </Form>
  );
}
