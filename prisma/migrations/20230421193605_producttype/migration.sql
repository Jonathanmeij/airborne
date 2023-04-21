/*
  Warnings:

  - Added the required column `productType` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "productType" AS ENUM ('KITE', 'BOARD', 'BAR', 'WETSUIT');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productType" "productType" NOT NULL;
