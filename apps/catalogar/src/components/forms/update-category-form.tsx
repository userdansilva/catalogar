"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@catalogar/ui/components/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@catalogar/ui/components/card";
import { Input } from "@catalogar/ui/components/input";
import { Badge } from "@catalogar/ui/components/badge";
import { Watch } from "react-hook-form";
import { Button } from "../inputs/button";
import { updateCategoryAction } from "@/actions/update-category-action";
import { routes } from "@/routes";
import { Category } from "@/services/get-category";
import { toastServerError } from "@/utils/toast-server-error";
import { updateCategorySchema } from "@/schemas/category";

export function UpdateCategoryForm({ category }: { category: Category }) {
  const router = useRouter();

  const { form, handleSubmitWithAction } = useHookFormAction(
    updateCategoryAction,
    zodResolver(updateCategorySchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          ...category,
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success("Alterações salvas!", {
            description: res.data.message,
          });
          router.push(routes.categories.url);
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
              <FormLabel>Nome</FormLabel>

              <FormControl>
                <Input
                  placeholder="Ex.: Dia dos namorados"
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

        <Card>
          <CardHeader>
            <CardTitle>Pré-visualização</CardTitle>
          </CardHeader>

          <CardContent>
            <Watch
              control={form.control}
              names={["name", "textColor", "backgroundColor"]}
              render={([name, textColor, backgroundColor]) => (
                <Badge
                  style={{
                    color: textColor,
                    background: backgroundColor,
                  }}
                >
                  {(name || "Categoria").trim()}
                </Badge>
              )}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-8">
          <FormField
            name="backgroundColor"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor de fundo</FormLabel>

                <FormControl>
                  <Input
                    type="color"
                    className="w-full max-w-48"
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="textColor"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor do texto</FormLabel>

                <FormControl>
                  <Input
                    type="color"
                    className="w-full max-w-48"
                    disabled={form.formState.isSubmitting}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
