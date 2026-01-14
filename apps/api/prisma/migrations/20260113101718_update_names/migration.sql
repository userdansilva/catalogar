/*
  Warnings:

  - You are about to drop the column `catalogId` on the `catalog_items` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `catalog_items` table. All the data in the column will be lost.
  - You are about to drop the column `productTypeId` on the `catalog_items` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `catalog_items` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `catalogs` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `catalogs` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `catalogs` table. All the data in the column will be lost.
  - You are about to drop the column `catalogId` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `product_types` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[catalog_id]` on the table `catalog_items` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[catalog_id]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `catalog_id` to the `catalog_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_id` to the `catalog_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `catalog_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `catalogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `catalogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `catalog_id` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "catalog_items" DROP CONSTRAINT "catalog_items_catalogId_fkey";

-- DropForeignKey
ALTER TABLE "catalog_items" DROP CONSTRAINT "catalog_items_productTypeId_fkey";

-- DropForeignKey
ALTER TABLE "catalogs" DROP CONSTRAINT "catalogs_userId_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_catalogId_fkey";

-- DropForeignKey
ALTER TABLE "product_types" DROP CONSTRAINT "product_types_catalogId_fkey";

-- DropIndex
DROP INDEX "catalog_items_catalogId_key";

-- DropIndex
DROP INDEX "categories_catalogId_key";

-- AlterTable
ALTER TABLE "catalog_items" DROP COLUMN "catalogId",
DROP COLUMN "createdAt",
DROP COLUMN "productTypeId",
DROP COLUMN "updatedAt",
ADD COLUMN     "catalog_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "type_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "catalogs" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "catalogId",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "catalog_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "product_types";

-- CreateTable
CREATE TABLE "types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "catalog_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "types_catalog_id_key" ON "types"("catalog_id");

-- CreateIndex
CREATE UNIQUE INDEX "catalog_items_catalog_id_key" ON "catalog_items"("catalog_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_catalog_id_key" ON "categories"("catalog_id");

-- AddForeignKey
ALTER TABLE "catalogs" ADD CONSTRAINT "catalogs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "types" ADD CONSTRAINT "types_catalog_id_fkey" FOREIGN KEY ("catalog_id") REFERENCES "catalogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_catalog_id_fkey" FOREIGN KEY ("catalog_id") REFERENCES "catalogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalog_items" ADD CONSTRAINT "catalog_items_catalog_id_fkey" FOREIGN KEY ("catalog_id") REFERENCES "catalogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalog_items" ADD CONSTRAINT "catalog_items_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
