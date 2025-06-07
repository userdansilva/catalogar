"use client";

import { catalogItemSchema } from "@/actions/schema";
import { Checkbox } from "@/shadcn/components/ui/checkbox";
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/shadcn/components/ui/select";
import { Textarea } from "@/shadcn/components/ui/textarea";
import { Category, ProductType } from "@/types/api-types";
import { FormEventHandler } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "../inputs/button";
import { InputImages } from "../inputs/input-images";

export type CatalogItemFormValues = z.infer<typeof catalogItemSchema>

type CatalogItemFormProps = {
  form: UseFormReturn<CatalogItemFormValues>
  onSubmit: FormEventHandler<HTMLFormElement>
  submitButtonLabel: string
  categories: Category[];
  productTypes: ProductType[];
}

export function CatalogItemForm({
  form, onSubmit, submitButtonLabel, categories, productTypes,
}: CatalogItemFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          name="images"
          control={form.control}
          disabled={form.formState.isSubmitting}
          render={({ field: { onChange, value, disabled } }) => (
            <FormItem>
              <FormLabel>Imagens</FormLabel>

              <FormControl>
                <InputImages
                  onChange={onChange}
                  value={value}
                  disabled={disabled}
                />
              </FormControl>

              <FormDescription>
                As imagens do item serão exibidas na ordem em que forem adicionadas
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="title"
          control={form.control}
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>

              <FormControl>
                <Input
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
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
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Legenda (Opcional)</FormLabel>

              <FormControl>
                <Textarea
                  placeholder="Descreva o item de catálogo"
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormDescription>
                Aproveite para incluir palavras-chave que ajudem
                seus clientes a encontrar esse item mais facilmente na busca.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="productTypeId"
          control={form.control}
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Produto</FormLabel>

              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          disabled={form.formState.isSubmitting}
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Categorias (Recomendado)</FormLabel>

                <FormDescription>
                  As categorias ajudam seus clientes a encontrar esse
                  item mais facilmente nos filtros.
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
                                checked={field.value?.includes(category.id)}
                                onCheckedChange={(checked) => (checked
                                  ? field.onChange([...(field.value || []), category.id])
                                  : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== category.id,
                                    ),
                                  ))}
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
                <div className="text-sm">
                  Nenhuma categoria adicionada
                </div>
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
