"use server";

import { ApiResponse } from "@/types/api-response";
import { Image } from "@/types/api-types";
import { ZodObject, ZodRawShape } from "zod";
import { BlockBlobClient } from "@azure/storage-blob";
import sharp from "sharp";
import path from "path";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { authActionClient } from "./safe-action";
import { imageSchema } from "./schema";

export const createImageAction = authActionClient
  .schema(imageSchema)
  .metadata({
    actionName: "create-image",
  })
  .action(async ({
    parsedInput: { image },
    ctx: { accessToken },
  }) => {
    try {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = path.parse(image.name).name;

      const { data } = await api.get<ApiResponse<Image>>(`/v1/storage/generate-sas-token?fileName=${fileName}.webp`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { data: { name, sasToken, url } } = data;

      const optimizedImage = await sharp(buffer)
        .resize(600, 600, {
          background: {
            r: 255, g: 255, b: 255, alpha: 1,
          },
          fit: "contain",
        })
        .webp({ quality: 80 })
        .toBuffer();

      const blockBlobClient = new BlockBlobClient(sasToken);
      await blockBlobClient.uploadData(optimizedImage);

      return { name, url };
    } catch (e) {
      returnValidationErrorsIfExists(e, imageSchema as unknown as ZodObject<ZodRawShape>);
      throw e;
    }
  });
