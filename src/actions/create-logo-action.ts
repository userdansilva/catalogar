"use server";

import { ApiResponse } from "@/types/api-response";
import { ZodObject, ZodRawShape } from "zod";
import { BlockBlobClient } from "@azure/storage-blob";
import sharp from "sharp";
import path from "path";
import { StorageSasToken } from "@/types/api-types";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { authActionClient } from "./safe-action";
import { imageSchema } from "./schema";

export const createLogoAction = authActionClient
  .schema(imageSchema)
  .metadata({
    actionName: "create-logo",
  })
  .action(async ({
    parsedInput: { image },
    ctx: { accessToken },
  }) => {
    try {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = path.parse(image.name).name;

      const { data } = await api.get<ApiResponse<StorageSasToken>>(`/v1/storage/generate-sas-token?fileName=${fileName}.webp`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { data: { name, sasToken, url } } = data;

      const resizedImage = await sharp(buffer)
        .resize({
          height: 80,
        })
        .toBuffer();

      const metadata = await sharp(resizedImage).metadata();

      const blockBlobClient = new BlockBlobClient(sasToken);
      await blockBlobClient.uploadData(resizedImage);

      return {
        name,
        url,
        width: metadata.width || 0,
        height: metadata.height || 0,
      };
    } catch (e) {
      returnValidationErrorsIfExists(e, imageSchema as unknown as ZodObject<ZodRawShape>);
      throw e;
    }
  });
