/*
  Warnings:

  - You are about to drop the column `paymentDataId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `discoutRate` on the `promotions` table. All the data in the column will be lost.
  - You are about to drop the `PaymentMethod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `paymentDatas` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `discountRate` to the `promotions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_paymentDataId_fkey";

-- DropForeignKey
ALTER TABLE "paymentDatas" DROP CONSTRAINT "paymentDatas_costumerId_fkey";

-- DropForeignKey
ALTER TABLE "paymentDatas" DROP CONSTRAINT "paymentDatas_paymentMethodType_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "paymentDataId";

-- AlterTable
ALTER TABLE "promotions" DROP COLUMN "discoutRate",
ADD COLUMN     "discountRate" INTEGER NOT NULL;

-- DropTable
DROP TABLE "PaymentMethod";

-- DropTable
DROP TABLE "paymentDatas";

-- CreateTable
CREATE TABLE "paymentMethods" (
    "type" VARCHAR NOT NULL,

    CONSTRAINT "paymentMethods_pkey" PRIMARY KEY ("type")
);
