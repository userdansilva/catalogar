/*
  Warnings:

  - You are about to drop the `_CatalogItemToCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `catalog_items` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CatalogItemToCategory" DROP CONSTRAINT "_CatalogItemToCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_CatalogItemToCategory" DROP CONSTRAINT "_CatalogItemToCategory_B_fkey";

-- DropForeignKey
ALTER TABLE "catalog_items" DROP CONSTRAINT "catalog_items_catalog_id_fkey";

-- DropForeignKey
ALTER TABLE "catalog_items" DROP CONSTRAINT "catalog_items_type_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password_hash" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CatalogItemToCategory";

-- DropTable
DROP TABLE "catalog_items";

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "catalog_id" TEXT NOT NULL,
    "type_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToItem_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "items_catalog_id_key" ON "items"("catalog_id");

-- CreateIndex
CREATE INDEX "_CategoryToItem_B_index" ON "_CategoryToItem"("B");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_catalog_id_fkey" FOREIGN KEY ("catalog_id") REFERENCES "catalogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToItem" ADD CONSTRAINT "_CategoryToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToItem" ADD CONSTRAINT "_CategoryToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
