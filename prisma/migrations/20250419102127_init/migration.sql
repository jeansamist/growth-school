/*
  Warnings:

  - You are about to drop the column `author` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `edition` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `isbn` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `modules` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `pages` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `testimonials` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "author",
DROP COLUMN "date",
DROP COLUMN "edition",
DROP COLUMN "isbn",
DROP COLUMN "language",
DROP COLUMN "modules",
DROP COLUMN "pages",
DROP COLUMN "testimonials";

-- CreateTable
CREATE TABLE "Ebook" (
    "id" SERIAL NOT NULL,
    "author" TEXT,
    "isbn" TEXT,
    "language" TEXT,
    "pages" INTEGER,
    "edition" TEXT,
    "date" TEXT,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "Ebook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Training" (
    "id" SERIAL NOT NULL,
    "modules" TEXT,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ebook_itemId_key" ON "Ebook"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "Training_itemId_key" ON "Training"("itemId");

-- AddForeignKey
ALTER TABLE "Ebook" ADD CONSTRAINT "Ebook_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
