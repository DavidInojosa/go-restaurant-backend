/*
  Warnings:

  - You are about to drop the column `idAdmin` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "foods" DROP CONSTRAINT "foods_idAdmin_fkey";

-- AlterTable
ALTER TABLE "foods" DROP COLUMN "idAdmin",
ADD COLUMN     "idUser" TEXT;

-- DropTable
DROP TABLE "admin";

-- DropTable
DROP TABLE "clients";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "foods" ADD CONSTRAINT "foods_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
