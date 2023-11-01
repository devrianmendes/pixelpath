-- CreateTable
CREATE TABLE "Costumers" (
    "costumerId" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,
    "surname" VARCHAR NOT NULL,
    "cpf" INTEGER NOT NULL,
    "mobile" BIGINT NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" CHAR NOT NULL,

    CONSTRAINT "Costumers_pkey" PRIMARY KEY ("costumerId")
);
