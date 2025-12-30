"use server";

import path from "node:path";
import { BlockBlobClient } from "@azure/storage-blob";
import sharp from "sharp";
import { ExpectedError } from "@/classes/ExpectedError";
import { authActionClient } from "@/lib/next-safe-action";
import { imageSchema } from "@/schemas/others";
import { postStorageGenerateSasToken } from "@/services/post-storage-generate-sas-token";
import { getFileType } from "@/utils/get-file-type";

export const createLogoAction = authActionClient
  .inputSchema(imageSchema)
  .metadata({
    actionName: "create-logo",
  })
  .action(async ({ parsedInput: { image } }) => {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const originalFileName = path.parse(image.name).base;
    const fileExt = path.parse(image.name).ext;
    const fileType = getFileType(fileExt);

    const [error, data] = await postStorageGenerateSasToken({
      fileType,
    });

    if (error) {
      throw new ExpectedError(error);
    }

    const resizedImage = await sharp(buffer)
      .resize({
        height: 80,
      })
      .toBuffer();

    const metadata = await sharp(resizedImage).metadata();

    const { uploadUrl, accessUrl } = data.data;

    const blockBlobClient = new BlockBlobClient(uploadUrl);
    await blockBlobClient.uploadData(resizedImage);

    return {
      fileName: originalFileName,
      url: accessUrl,
      sizeInBytes: resizedImage.length,
      width: metadata.width || 0,
      height: metadata.height || 0,
    };
  });
