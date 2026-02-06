/*
  Warnings:

  - You are about to drop the column `name` on the `catalogs` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "catalogs" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "name",
ADD COLUMN     "user_name" TEXT;
