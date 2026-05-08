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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@catalogar/ui/components/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { Watch } from "react-hook-form";
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
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-8">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>

              <FormControl>
                <Input
                  placeholder="Ex.: Meu Catálogo"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>

              <FormDescription>
                Esse nome aparecerá apenas para você.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="isPublished"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visibilidade</FormLabel>
              <Select
                onValueChange={(e) => {
                  field.onChange(e === "PUBLIC");
                }}
                defaultValue={field.value ? "PUBLIC" : "PRIVATE"}
                disabled={form.formState.isSubmitting}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                </FormControl>
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

              <Watch
                control={form.control}
                names={["isPublished"]}
                render={([isPublished]) => (
                  <>
                    {!catalog.slug && isPublished && (
                      <FormDescription>
                        Após clicar em Salvar Alterações você será redirecionado
                        para a tela de publicação de catálogo.
                      </FormDescription>
                    )}
                  </>
                )}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="slug"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Link customizado (Apenas catálogo público)</FormLabel>

              <div className="flex">
                <div className="bg-muted text-muted-foreground flex h-9 items-center rounded-l-md border border-r-0 px-3 py-2 text-sm">
                  {`${process.env.NEXT_PUBLIC_BASE_URL}/@`}
                </div>
                <div className="flex-1">
                  <FormControl>
                    <Input
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck="false"
                      className="rounded-l-none"
                      placeholder="minha-empresaaa"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                </div>
              </div>

              <FormDescription>
                Apenas letras minúsculas, números e hífens são permitidos
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
