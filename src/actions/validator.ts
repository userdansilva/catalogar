import { z } from "zod";

const slugValidator = z.string().regex(
  new RegExp("^[a-z0-9]+(?:-[a-z0-9]+)*$"),
  "Só pode ter letras, números e hífens. Ex.: exemplo, meu-exemplo, meu-exemplo-123"
)

export const validator = {
  slugValidator
}
