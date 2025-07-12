"use server";

import { ApiResponse } from "@/types/api-response";
import { ZodObject, ZodRawShape } from "zod";
import { BlockBlobClient } from "@azure/storage-blob";
import sharp from "sharp";
import { StorageSasToken } from "@/types/api-types";
import { api } from "./api";
import { returnValidationErrorsIfExists } from "./return-validation-errors-if-exists";
import { authActionClient } from "./safe-action";
import { imageSchema } from "./schema";

export const createImageAction = authActionClient
  .schema(imageSchema)
  .metadata({
    actionName: "create-image",
  })
  .action(async ({ parsedInput: { image }, ctx: { accessToken } }) => {
    try {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { data } = await api.post<ApiResponse<StorageSasToken>>(
        "/v1/storage/generate-sas-token",
        {
          fileType: "WEBP",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const {
        data: { fileName, uploadUrl, accessUrl },
      } = data;

      const optimizedImage = await sharp(buffer)
        .resize(600, 600, {
          background: {
            r: 255,
            g: 255,
            b: 255,
            alpha: 1,
          },
          fit: "contain",
        })
        .webp({ quality: 100 })
        .toBuffer();

      const blockBlobClient = new BlockBlobClient(uploadUrl);
      await blockBlobClient.uploadData(optimizedImage);

      return { fileName, accessUrl };
    } catch (e) {
      returnValidationErrorsIfExists(
        e,
        imageSchema as unknown as ZodObject<ZodRawShape>,
      );
      throw e;
    }
  });
