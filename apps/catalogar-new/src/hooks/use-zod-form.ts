import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormProps, useForm } from "react-hook-form";
import type { ZodRawShape } from "zod";
import type { z } from "zod/v3";

export const useZodForm = <T extends z.ZodObject<ZodRawShape>>(
  schema: T,
  options?: Omit<UseFormProps<z.infer<T>>, "resolver">,
) => {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    ...options,
  });
};
