/*
  Warnings:

  - You are about to drop the column `preco` on the `Coffee` table. All the data in the column will be lost.
  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Entrega` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItemPedido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pedido` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagCoffee` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `precoUnitario` to the `Coffee` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PENDENTE', 'EM_TRANSITO', 'ENTREGUE');

-- DropForeignKey
ALTER TABLE "Entrega" DROP CONSTRAINT "Entrega_pedidoId_fkey";

-- DropForeignKey
ALTER TABLE "ItemPedido" DROP CONSTRAINT "ItemPedido_idCoffee_fkey";

-- DropForeignKey
ALTER TABLE "ItemPedido" DROP CONSTRAINT "ItemPedido_idPedido_fkey";

-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_idCliente_fkey";

-- DropForeignKey
ALTER TABLE "TagCoffee" DROP CONSTRAINT "TagCoffee_coffeeId_fkey";

-- AlterTable
ALTER TABLE "Coffee" DROP COLUMN "preco",
ADD COLUMN     "precoUnitario" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "Cliente";

-- DropTable
DROP TABLE "Entrega";

-- DropTable
DROP TABLE "ItemPedido";

-- DropTable
DROP TABLE "Pedido";

-- DropTable
DROP TABLE "TagCoffee";

-- DropEnum
DROP TYPE "StatusEntrega";

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "dataPedido" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemOrder" (
    "id" SERIAL NOT NULL,
    "cafeId" INTEGER NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "precoUnitario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ItemOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delivery" (
    "id" SERIAL NOT NULL,
    "endereco" TEXT NOT NULL,
    "status" "DeliveryStatus" NOT NULL,
    "dataPrevistaEntrega" TIMESTAMP(3) NOT NULL,
    "pedidoId" INTEGER NOT NULL,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_cpf_key" ON "Client"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "ItemOrder_cafeId_pedidoId_key" ON "ItemOrder"("cafeId", "pedidoId");

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_pedidoId_key" ON "Delivery"("pedidoId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemOrder" ADD CONSTRAINT "ItemOrder_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "Coffee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemOrder" ADD CONSTRAINT "ItemOrder_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
