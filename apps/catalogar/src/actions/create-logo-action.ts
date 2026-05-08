"use server";

import path from "node:path";
import { BlockBlobClient } from "@azure/storage-blob";
import sharp from "sharp";
import { authActionClient } from "@/lib/next-safe-action";
import { imageSchema } from "@/schemas/others";
import { generateSasToken } from "@/utils/generate-sas-token";
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

    const { accessUrl, uploadUrl } = generateSasToken(fileType);

    const resizedImage = await sharp(buffer)
      .resize({
        height: 80,
      })
      .toBuffer();

    const metadata = await sharp(resizedImage).metadata();

    const blockBlobClient = new BlockBlobClient(uploadUrl);
    await blockBlobClient.uploadData(resizedImage);

    return {
      name: originalFileName,
      url: accessUrl,
      sizeInBytes: resizedImage.length,
      width: metadata.width || 0,
      height: metadata.height || 0,
    };
  });
