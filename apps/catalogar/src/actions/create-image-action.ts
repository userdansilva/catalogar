"use server";

import { BlockBlobClient } from "@azure/storage-blob";
import sharp from "sharp";
import { authActionClient } from "@/lib/next-safe-action";
import { imageSchema } from "@/schemas/others";
import { generateSasToken } from "@/utils/generate-sas-token";

export const createImageAction = authActionClient
  .inputSchema(imageSchema)
  .metadata({
    actionName: "create-image",
  })
  .action(async ({ parsedInput: { image } }) => {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { uploadUrl, accessUrl, fileName } = generateSasToken("WEBP");

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

    return {
      fileName,
      url: accessUrl,
      size: optimizedImage.length,
      width: 600,
      height: 600,
    };
  });
