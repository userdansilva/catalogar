/*
  Warnings:

  - You are about to drop the `files` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `width` on table `catalog_item_images` required. This step will fail if there are existing NULL values in that column.
  - Made the column `height` on table `catalog_item_images` required. This step will fail if there are existing NULL values in that column.
  - Made the column `altText` on table `catalog_item_images` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_catalogId_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_catalogId_fkey";

-- DropForeignKey
ALTER TABLE "themes" DROP CONSTRAINT "themes_logoId_fkey";

-- AlterTable
ALTER TABLE "catalog_item_images" ALTER COLUMN "width" SET NOT NULL,
ALTER COLUMN "height" SET NOT NULL,
ALTER COLUMN "altText" SET NOT NULL;

-- DropTable
DROP TABLE "files";

-- DropTable
DROP TABLE "images";

-- DropEnum
DROP TYPE "FileType";

-- CreateTable
CREATE TABLE "theme_logos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "size" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "altText" TEXT NOT NULL,
    "themeId" TEXT NOT NULL,
    "catalogId" TEXT NOT NULL,

    CONSTRAINT "theme_logos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "theme_logos_url_key" ON "theme_logos"("url");

-- CreateIndex
CREATE UNIQUE INDEX "theme_logos_themeId_key" ON "theme_logos"("themeId");

-- AddForeignKey
ALTER TABLE "theme_logos" ADD CONSTRAINT "theme_logos_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "themes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "theme_logos" ADD CONSTRAINT "theme_logos_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "catalogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
