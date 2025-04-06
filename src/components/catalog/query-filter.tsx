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

export function QueryFilter(props: { currentQuery: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { query: "" },
    values: { query: props.currentQuery },
    resolver: zodResolver(queryFilterSchema),
  });

  const handleSubmit = (values: FormValues) => {
    const params = new URLSearchParams(searchParams);

    if (params.get("page")) {
      params.delete("page");
    }

    if (values.query) {
      params.set("q", values.query);
    } else {
      params.delete("q");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClear = () => {
    form.resetField("query");
    handleSubmit({ query: "" });
  };

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
              className="h-14 w-full rounded-full bg-background px-12 text-lg shadow-sm ring-1 ring-inset ring-input focus-visible:ring-2 focus-visible:ring-ring"
              autoCorrect="off"
              spellCheck="false"
              {...field}
            />
          )}
        />

        {props.currentQuery && (
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
        <Button type="submit" size="sm" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full">
          Buscar
        </Button>
      </form>
    </Form>
  );
}
