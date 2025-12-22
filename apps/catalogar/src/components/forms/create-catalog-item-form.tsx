"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
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
} from "@catalogar/ui/components/form";
import { Input } from "@catalogar/ui/components/input";
import { Textarea } from "@catalogar/ui/components/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@catalogar/ui/components/select";
import { Checkbox } from "@catalogar/ui/components/checkbox";
import { InputImages } from "../inputs/input-images";
import { Button } from "../inputs/button";
import { routes } from "@/routes";
import { createCatalogItemAction } from "@/actions/create-catalog-item-action";
import type { Category } from "@/services/get-category";
import type { ProductType } from "@/services/get-product-type";
import { toastServerError } from "@/utils/toast-server-error";
import { createCatalogItemSchema } from "@/schemas/catalog-item";

export function CreateCatalogItemForm({
  categories,
  productTypes,
  callbackUrl,
}: {
  categories: Category[];
  productTypes: ProductType[];
  callbackUrl?: string;
}) {
  const router = useRouter();

  const { form, handleSubmitWithAction } = useHookFormAction(
    createCatalogItemAction,
    zodResolver(createCatalogItemSchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          title: "",
          caption: "",
          productTypeId:
            productTypes.length === 1 && productTypes[0]?.id
              ? productTypes[0].id
              : "",
          images: [],
          price: "",
          categoryIds: [],
          isDisabled: false,
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success("Item de catálogo adicionado!", {
            description: res.data.message,
          });
          router.push(callbackUrl || routes.catalogItems.url);
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
          name="images"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagens</FormLabel>

              <FormControl>
                <InputImages
                  {...field}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>

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
                  Tamanho máximo: 1MB. (Dica: Use{" "}
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
                Aproveite para incluir palavras-chave que ajude seus clientes a
                encontrarem esse item mais facilmente.
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
                  <SelectTrigger className="w-full">
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
                            className="flex flex-row items-start space-y-0 space-x-2 rounded-md border px-3 py-2"
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
          Adicionar
        </Button>
      </form>
    </Form>
  );
}
