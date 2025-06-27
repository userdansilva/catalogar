"use client";

import { queryFilterSchema } from "@/actions/schema";
import { Button } from "@/shadcn/components/ui/button";
import { Form, FormField } from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormValues = z.infer<typeof queryFilterSchema>;

export function QueryFilter({
  currentQuery,
  mode,
  primaryColor,
  secondaryColor,
  searchParamNames,
}: {
  currentQuery?: string,
  mode: "preview" | "dashboard"
  primaryColor?: string
  secondaryColor?: string
  searchParamNames: {
    query: string;
    page: string;
  }
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex items-center">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <FormField
              name="query"
              control={form.control}
              disabled={form.formState.isSubmitting}
              render={({ field }) => (
                <Input
                  placeholder="Buscar item..."
                  className="rounded-r-none pl-12"
                  autoCorrect="off"
                  spellCheck="false"
                  {...field}
                />
              )}
            />
          </div>

          <Button
            type="submit"
            className="rounded-l-none"
          >
            Buscar
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="relative">
        <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

        <FormField
          name="query"
          control={form.control}
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <Input
              placeholder="O que você está procurando?"
              className="h-14 w-full rounded-full border-0 bg-background px-12 text-sm shadow-sm ring-1 ring-inset ring-input focus-visible:ring-2 focus-visible:ring-ring sm:text-base"
              autoCorrect="off"
              spellCheck="false"
              {...field}
            />
          )}
        />

        {currentQuery && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-20 top-1/2 size-5 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-5" />
            <span className="sr-only">Limpar busca</span>
          </Button>
        )}
        <Button
          type="submit"
          size="sm"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full shadow-none"
          style={{
            background: secondaryColor,
            color: primaryColor,
          }}
        >
          Buscar
        </Button>
      </form>
    </Form>
  );
}
