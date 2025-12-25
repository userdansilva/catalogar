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
import { createCategoryAction } from "@/actions/create-category-action";
import { routes } from "@/routes";
import { createCategorySchema } from "@/schemas/category";
import { toastServerError } from "@/utils/toast-server-error";
import { Button } from "../inputs/button";

type CreateCategoryFormProps = {
  callbackUrl?: string;
};

export function CreateCategoryForm({ callbackUrl }: CreateCategoryFormProps) {
  const router = useRouter();

  const { form, handleSubmitWithAction } = useHookFormAction(
    createCategoryAction,
    zodResolver(createCategorySchema),
    {
      formProps: {
        mode: "onChange",
        defaultValues: {
          name: "",
          textColor: "#FFFFFF",
          backgroundColor: "#000000",
        },
      },
      actionProps: {
        onSuccess: (res) => {
          toast.success("Categoria adicionada!", {
            description: res.data.message,
          });
          router.push(callbackUrl || routes.categories.url);
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
          Adicionar
        </Button>
      </form>
    </Form>
  );
}
