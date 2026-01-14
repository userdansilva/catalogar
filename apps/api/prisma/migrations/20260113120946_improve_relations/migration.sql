/*
  Warnings:

  - A unique constraint covering the columns `[current_catalog_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "current_catalog_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_current_catalog_id_key" ON "users"("current_catalog_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_current_catalog_id_fkey" FOREIGN KEY ("current_catalog_id") REFERENCES "catalogs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
