"use client";

import { queryFilterSchema } from "@/schemas/others";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useMemo } from "react";

type FormValues = z.infer<typeof queryFilterSchema>;

type StoreQueryFilterProps = {
  currentQuery: string;
  sendTo: string;
  autoFocus?: boolean;
};

export function StoreQueryFilter({
  currentQuery,
  sendTo,
  autoFocus,
}: StoreQueryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultValues = useMemo(
    () => ({
      query: "",
    }),
    [],
  );

  const { reset, setFocus, ...form } = useForm<FormValues>({
    mode: "onChange",
    defaultValues,
    values: { query: currentQuery ?? "" },
    resolver: zodResolver(queryFilterSchema),
  });

  const handleSubmit = (values: FormValues) => {
    const params = new URLSearchParams(searchParams);

    // Reset page filter
    if (params.get("p")) {
      params.delete("p");
    }

    if (values.query) {
      params.set("busca", values.query);
    } else {
      params.delete("busca");
    }

    const paramsString = params.toString();

    if (paramsString) {
      router.push(`${sendTo}?${paramsString}`);
      return;
    }

    router.push(sendTo);
  };

  const handleClear = () => {
    form.resetField("query");
    handleSubmit({ query: "" });
  };

  useEffect(() => {
    /**
     * @see CreateCategoryForm
     */
    reset({
      query: currentQuery,
    });
    /**
     * Avoid calling setFocus right after reset as all input references will be removed by reset API.
     *
     * https://react-hook-form.com/docs/useform/setfocus
     */
    if (autoFocus) {
      setTimeout(() => {
        setFocus("query");
      }, 500);
    }
  }, [autoFocus, currentQuery, reset, setFocus]);

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="relative">
        <SearchIcon className="text-muted-foreground absolute top-1/2 left-4 size-5 -translate-y-1/2" />

        <Controller
          name="query"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="O que você está procurando?"
                className="bg-background ring-input focus-visible:ring-ring h-14 w-full rounded-full border-0 pr-28 pl-12 text-sm shadow-xs ring-1 ring-inset focus-visible:ring-2 sm:text-base"
                autoCorrect="off"
                autoComplete="off"
                spellCheck="false"
                autoFocus={autoFocus}
                disabled={form.formState.isSubmitting}
              />
            </Field>
          )}
        />

        {currentQuery && (
          <div className="absolute top-1/2 right-20 -translate-y-1/2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="text-muted-foreground hover:text-foreground"
            >
              <XIcon className="size-5" />
              <span className="sr-only">Limpar busca</span>
            </Button>
          </div>
        )}
        <div className="absolute top-1/2 right-3 -translate-y-1/2">
          <Button
            type="submit"
            size="sm"
            className="rounded-full bg-black text-white shadow-none hover:bg-neutral-800 hover:text-neutral-50"
          >
            Buscar
          </Button>
        </div>
      </form>
    </div>
  );
}
