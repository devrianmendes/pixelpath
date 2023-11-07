/*
  Warnings:

  - You are about to drop the `Costumers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Costumers";

-- CreateTable
CREATE TABLE "costumers" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "surname" VARCHAR NOT NULL,
    "cpf" INTEGER NOT NULL,
    "mobile" BIGINT NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "costumers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "costPrice" DECIMAL NOT NULL,
    "sellPrice" DECIMAL NOT NULL,
    "banner" VARCHAR NOT NULL,
    "quantity" INTEGER NOT NULL,
    "discountRate" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" VARCHAR NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" VARCHAR NOT NULL,
    "total" DECIMAL NOT NULL,
    "status" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "costumerId" VARCHAR NOT NULL,
    "addressId" VARCHAR NOT NULL,
    "paymentDataId" VARCHAR NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" VARCHAR NOT NULL,
    "total" DECIMAL NOT NULL,
    "productId" VARCHAR NOT NULL,
    "orderId" VARCHAR NOT NULL,
    "costumerId" VARCHAR NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "number" VARCHAR NOT NULL,
    "city" VARCHAR NOT NULL,
    "state" VARCHAR NOT NULL,
    "cep" INTEGER NOT NULL,
    "costumerId" VARCHAR NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentDatas" (
    "id" VARCHAR NOT NULL,
    "provider" VARCHAR NOT NULL,
    "number" VARCHAR NOT NULL,
    "expireDate" DATE NOT NULL,
    "isDefault" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "costumerId" VARCHAR NOT NULL,
    "paymentMethodId" VARCHAR NOT NULL,

    CONSTRAINT "paymentDatas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentMethod" (
    "type" VARCHAR NOT NULL,

    CONSTRAINT "paymentMethod_pkey" PRIMARY KEY ("type")
);

-- CreateTable
CREATE TABLE "productDetails" (
    "id" VARCHAR NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "manufacturer" VARCHAR NOT NULL,
    "productId" VARCHAR NOT NULL,

    CONSTRAINT "productDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salesInfos" (
    "sales" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" VARCHAR NOT NULL,

    CONSTRAINT "salesInfos_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "parentCategoryId" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotions" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "discoutRate" INTEGER NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryPromotion" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "categoryId" VARCHAR NOT NULL,
    "promotionId" VARCHAR NOT NULL,

    CONSTRAINT "CategoryPromotion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_costumerId_fkey" FOREIGN KEY ("costumerId") REFERENCES "costumers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_paymentDataId_fkey" FOREIGN KEY ("paymentDataId") REFERENCES "paymentDatas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_costumerId_fkey" FOREIGN KEY ("costumerId") REFERENCES "costumers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_costumerId_fkey" FOREIGN KEY ("costumerId") REFERENCES "costumers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentDatas" ADD CONSTRAINT "paymentDatas_costumerId_fkey" FOREIGN KEY ("costumerId") REFERENCES "costumers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentDatas" ADD CONSTRAINT "paymentDatas_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "paymentMethod"("type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productDetails" ADD CONSTRAINT "productDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salesInfos" ADD CONSTRAINT "salesInfos_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parentCategoryId_fkey" FOREIGN KEY ("parentCategoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryPromotion" ADD CONSTRAINT "CategoryPromotion_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryPromotion" ADD CONSTRAINT "CategoryPromotion_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "promotions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
