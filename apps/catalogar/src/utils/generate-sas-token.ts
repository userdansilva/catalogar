import { randomUUID } from "node:crypto";
import {
  BlobSASPermissions,
  BlobServiceClient,
  generateBlobSASQueryParameters,
  SASProtocol,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";

function parseAccountKeyFromConnectionString(connectionString: string) {
  const match = connectionString.match(/AccountKey=([^;]+)/);

  if (!match) throw new Error("AccountKey not found in connection string");

  return match[1] || "";
}

export function generateSasToken(fileType: "PNG" | "JPG" | "SVG" | "WEBP") {
  const client = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING || "",
  );
  const extension = {
    PNG: ".png",
    JPG: ".jpg",
    SVG: ".svg",
    WEBP: ".webp",
  };
  const fileName = `${randomUUID()}${extension[fileType]}`;

  const containerClient = client.getContainerClient(
    process.env.BLOB_CONTAINER_NAME || "",
  );
  const blobClient = containerClient.getBlockBlobClient(fileName);

  const expiresOn = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  // Extract account name + key from the connection string for SAS generation
  const accountName = client.accountName;
  const accountKey = parseAccountKeyFromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING || "",
  );
  const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    accountKey,
  );

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName: process.env.BLOB_CONTAINER_NAME || "",
      blobName: fileName,
      permissions: BlobSASPermissions.parse("rw"), // read + write
      expiresOn,
      protocol: SASProtocol.Https,
    },
    sharedKeyCredential,
  ).toString();

  const storageAccountUrl = client.url.replace(/\/$/, "");
  const defaultBlobUrl = blobClient.url;
  const accessUrl = defaultBlobUrl.replace(
    storageAccountUrl,
    process.env.BLOB_CUSTOM_URL || "",
  );
  const uploadUrl = `${defaultBlobUrl}?${sasToken}`;

  return {
    uploadUrl,
    accessUrl,
    fileName,
  };
}
