"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { queryFilterSchema } from "@/schemas/others";
import { Field } from "../ui/field";

type FormValues = z.infer<typeof queryFilterSchema>;

export function QueryFilter({
  currentQuery,
  mode,
  searchParamNames,
}: {
  currentQuery?: string;
  mode: "preview" | "dashboard";
  searchParamNames: {
    query: string;
    page: string;
  };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { query: "" },
    values: { query: currentQuery ?? "" },
    resolver: zodResolver(queryFilterSchema),
  });

  const handleSubmit = (values: FormValues) => {
    const params = new URLSearchParams(searchParams);

    // Reset page filter
    if (params.get(searchParamNames.page)) {
      params.delete(searchParamNames.page);
    }

    if (values.query) {
      params.set(searchParamNames.query, values.query);
    } else {
      params.delete(searchParamNames.query);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClear = () => {
    form.resetField("query");
    handleSubmit({ query: "" });
  };

  if (mode === "dashboard") {
    return (
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex items-center"
      >
        <div className="relative w-full">
          <Search className="text-muted-foreground absolute top-1/2 left-4 size-4 -translate-y-1/2" />

          <Controller
            name="query"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Buscar item..."
                  className="rounded-r-none pl-12"
                  autoCorrect="off"
                  spellCheck="false"
                  disabled={form.formState.isSubmitting}
                />
              </Field>
            )}
          />
        </div>

        <Button type="submit" className="rounded-l-none">
          Buscar
        </Button>
      </form>
    );
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-4 size-5 -translate-y-1/2" />

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
                spellCheck="false"
                disabled={form.formState.isSubmitting}
              />
            </Field>
          )}
        />

        {currentQuery && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-20 -translate-y-1/2"
          >
            <X className="size-5" />
            <span className="sr-only">Limpar busca</span>
          </Button>
        )}
        <Button
          type="submit"
          size="sm"
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-black text-white shadow-none hover:bg-neutral-800 hover:text-neutral-50"
        >
          Buscar
        </Button>
      </form>

      {currentQuery && (
        <h2 className="mt-4 text-center text-3xl font-bold tracking-tight">
          {currentQuery}
        </h2>
      )}
    </div>
  );
}
