"use server";

import { ApiResponse } from "@/types/api-response";
import { ZodObject, ZodRawShape } from "zod";
import { BlockBlobClient } from "@azure/storage-blob";
import sharp from "sharp";
import path from "path";
import { StorageSasToken } from "@/types/api-types";
import { getFileType } from "@/utils/getFileType";
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
      const originalFileName = path.parse(image.name).base;
      const fileExt = path.parse(image.name).ext;
      const fileType = getFileType(fileExt);

      const { data } = await api.post<ApiResponse<StorageSasToken>>("/v1/storage/generate-sas-token", {
        fileType,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { data: { fileName, uploadUrl, accessUrl } } = data;

      const resizedImage = await sharp(buffer)
        .resize({
          height: 80,
        })
        .toBuffer();

      const metadata = await sharp(resizedImage).metadata();

      const blockBlobClient = new BlockBlobClient(uploadUrl);
      await blockBlobClient.uploadData(resizedImage);

      return {
        fileName,
        originalFileName,
        accessUrl,
        width: metadata.width || 0,
        height: metadata.height || 0,
      };
    } catch (e) {
      returnValidationErrorsIfExists(e, imageSchema as unknown as ZodObject<ZodRawShape>);
      throw e;
    }
  });
