"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { queryFilterSchema } from "@/schemas/others";
import { Field } from "../ui/field";

type FormValues = z.infer<typeof queryFilterSchema>;

export function QueryFilter({ currentQuery }: { currentQuery?: string }) {
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
    if (params.get("p")) {
      params.delete("p");
    }

    if (values.query) {
      params.set("busca", values.query);
    } else {
      params.delete("busca");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

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
