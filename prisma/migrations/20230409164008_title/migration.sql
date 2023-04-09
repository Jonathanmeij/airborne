/*
  Warnings:

  - A unique constraint covering the columns `[title_id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title_id` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "title_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_title_id_key" ON "Product"("title_id");
