/*
  Warnings:

  - You are about to alter the column `total` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Decimal(7,2)`.
  - You are about to drop the column `paymentMethodId` on the `paymentDatas` table. All the data in the column will be lost.
  - You are about to alter the column `weight` on the `productDetails` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(3,1)`.
  - You are about to alter the column `height` on the `productDetails` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(4,1)`.
  - You are about to alter the column `width` on the `productDetails` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(4,1)`.
  - You are about to alter the column `length` on the `productDetails` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(4,1)`.
  - You are about to alter the column `costPrice` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Decimal(7,2)`.
  - You are about to alter the column `sellPrice` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Decimal(7,2)`.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CategoryPromotion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `paymentMethod` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isDefault` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `costumers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethodType` to the `paymentDatas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_costumerId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_productId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryPromotion" DROP CONSTRAINT "CategoryPromotion_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryPromotion" DROP CONSTRAINT "CategoryPromotion_promotionId_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_parentCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "paymentDatas" DROP CONSTRAINT "paymentDatas_paymentMethodId_fkey";

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "isDefault" BOOLEAN NOT NULL,
ALTER COLUMN "cep" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "parentCategoryId" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "costumers" ADD COLUMN     "role" VARCHAR NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "total" SET DATA TYPE DECIMAL(7,2);

-- AlterTable
ALTER TABLE "paymentDatas" DROP COLUMN "paymentMethodId",
ADD COLUMN     "paymentMethodType" VARCHAR NOT NULL;

-- AlterTable
ALTER TABLE "productDetails" ALTER COLUMN "weight" SET DATA TYPE DECIMAL(3,1),
ALTER COLUMN "height" SET DATA TYPE DECIMAL(4,1),
ALTER COLUMN "width" SET DATA TYPE DECIMAL(4,1),
ALTER COLUMN "length" SET DATA TYPE DECIMAL(4,1);

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "costPrice" SET DATA TYPE DECIMAL(7,2),
ALTER COLUMN "sellPrice" SET DATA TYPE DECIMAL(7,2);

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "CategoryPromotion";

-- DropTable
DROP TABLE "paymentMethod";

-- CreateTable
CREATE TABLE "carts" (
    "id" VARCHAR NOT NULL,
    "total" DECIMAL(7,2) NOT NULL,
    "productId" VARCHAR NOT NULL,
    "orderId" VARCHAR NOT NULL,
    "costumerId" VARCHAR NOT NULL,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "name" VARCHAR NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "type" VARCHAR NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("type")
);

-- CreateTable
CREATE TABLE "categoryPromotions" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "categoryId" VARCHAR NOT NULL,
    "promotionId" VARCHAR NOT NULL,

    CONSTRAINT "categoryPromotions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "costumers" ADD CONSTRAINT "costumers_role_fkey" FOREIGN KEY ("role") REFERENCES "roles"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_costumerId_fkey" FOREIGN KEY ("costumerId") REFERENCES "costumers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentDatas" ADD CONSTRAINT "paymentDatas_paymentMethodType_fkey" FOREIGN KEY ("paymentMethodType") REFERENCES "PaymentMethod"("type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parentCategoryId_fkey" FOREIGN KEY ("parentCategoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoryPromotions" ADD CONSTRAINT "categoryPromotions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoryPromotions" ADD CONSTRAINT "categoryPromotions_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "promotions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
