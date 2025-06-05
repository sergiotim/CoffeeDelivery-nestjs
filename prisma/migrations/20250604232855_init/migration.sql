-- CreateTable
CREATE TABLE "Coffee" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Coffee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagCoffee" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "coffeeId" INTEGER NOT NULL,

    CONSTRAINT "TagCoffee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TagCoffee" ADD CONSTRAINT "TagCoffee_coffeeId_fkey" FOREIGN KEY ("coffeeId") REFERENCES "Coffee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
