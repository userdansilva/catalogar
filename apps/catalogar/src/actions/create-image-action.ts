"use server";

import { BlockBlobClient } from "@azure/storage-blob";
import sharp from "sharp";
import { postStorageGenerateSasToken } from "@/services/post-storage-generate-sas-token";
import { ExpectedError } from "@/classes/ExpectedError";
import { imageSchema } from "@/schemas/others";
import { authActionClient } from "@/lib/next-safe-action";

export const createImageAction = authActionClient
  .inputSchema(imageSchema)
  .metadata({
    actionName: "create-image",
  })
  .action(async ({ parsedInput: { image } }) => {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const [error, data] = await postStorageGenerateSasToken({
      fileType: "WEBP",
    });

    if (error) {
      throw new ExpectedError(error);
    }

    const { fileName, uploadUrl, accessUrl } = data.data;

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
      sizeInBytes: optimizedImage.length,
      width: 600,
      height: 600,
    };
  });
