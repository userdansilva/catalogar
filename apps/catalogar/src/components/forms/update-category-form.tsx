"use client";

import { Badge } from "@catalogar/ui/components/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@catalogar/ui/components/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@catalogar/ui/components/form";
import { Input } from "@catalogar/ui/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "next/navigation";
import { Watch } from "react-hook-form";
import { toast } from "sonner";
import { updateCategoryAction } from "@/actions/update-category-action";
import type { Category } from "@/generated/prisma/client";
import { routes } from "@/routes";
import { updateCategorySchema } from "@/schemas/category";
import { Button } from "../inputs/button";

type UpdateCategoryFormProps = {
  category: Category;
};

export function UpdateCategoryForm({ category }: UpdateCategoryFormProps) {
  const router = useRouter();

  const { form, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(updateCategoryAction, zodResolver(updateCategorySchema), {
      formProps: {
        mode: "onChange",
        defaultValues: {
          id: category.id,
          name: category.name,
          backgroundColor: category.backgroundColor,
          textColor: category.textColor,
          isDisabled: category.disabledAt !== null,
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.success("Alterações salvas!");
          resetFormAndAction();
          router.push(routes.categories.url);
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
