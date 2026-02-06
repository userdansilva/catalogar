/*
  Warnings:

  - You are about to drop the column `type_id` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `current_catalog_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `_CategoryToItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `types` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `catalogs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_id` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToItem" DROP CONSTRAINT "_CategoryToItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToItem" DROP CONSTRAINT "_CategoryToItem_B_fkey";

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_type_id_fkey";

-- DropForeignKey
ALTER TABLE "types" DROP CONSTRAINT "types_catalog_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_current_catalog_id_fkey";

-- DropIndex
DROP INDEX "categories_catalog_id_key";

-- DropIndex
DROP INDEX "items_catalog_id_key";

-- DropIndex
DROP INDEX "users_current_catalog_id_key";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "type_id",
ADD COLUMN     "category_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "current_catalog_id",
DROP COLUMN "name";

-- DropTable
DROP TABLE "_CategoryToItem";

-- DropTable
DROP TABLE "types";

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_key" ON "profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "catalogs_user_id_key" ON "catalogs"("user_id");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
