"use server";

import { authActionClient } from "@/lib/next-safe-action";
import { generateSasToken } from "@/utils/generate-sas-token";
import z from "zod";

export const createSasTokenAction = authActionClient
  .inputSchema(
    z.object({
      fileType: z.enum(["PNG", "JPG", "SVG", "WEBP"]),
    }),
  )
  .metadata({
    actionName: "create-sas-token",
  })
  .action(async ({ parsedInput: { fileType } }) => {
    const { uploadUrl, accessUrl, fileName } = generateSasToken(fileType);

    return { uploadUrl, accessUrl, fileName };
  });
