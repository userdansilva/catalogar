import { z } from "zod";

const slugValidator = z.string().regex(
  /^[a-zA-Z0-9-]+$/,
  "Use apenas letras, números e hífens. Exemplos válidos: exemplo, meu-exemplo, meu-exemplo-123",
);

export const validator = {
  slugValidator,
};
