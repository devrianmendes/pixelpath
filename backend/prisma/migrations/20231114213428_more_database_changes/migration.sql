/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `productDetails` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdBy` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `categoryPromotions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `categoryPromotions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `paymentDatas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `promotions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `promotions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "createdBy" VARCHAR NOT NULL;

-- AlterTable
ALTER TABLE "categoryPromotions" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" VARCHAR NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedBy" VARCHAR NOT NULL;

-- AlterTable
ALTER TABLE "costumers" ALTER COLUMN "role" DROP DEFAULT;

-- AlterTable
ALTER TABLE "paymentDatas" ADD COLUMN     "createdBy" VARCHAR NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "createdBy" VARCHAR NOT NULL,
ADD COLUMN     "updatedBy" VARCHAR NOT NULL;

-- AlterTable
ALTER TABLE "promotions" ADD COLUMN     "createdBy" VARCHAR NOT NULL,
ADD COLUMN     "updatedBy" VARCHAR NOT NULL;

-- AlterTable
ALTER TABLE "salesInfos" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "productDetails_productId_key" ON "productDetails"("productId");
