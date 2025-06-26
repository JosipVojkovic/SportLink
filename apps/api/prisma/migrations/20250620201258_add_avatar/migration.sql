-- CreateEnum
CREATE TYPE "AvatarSkinColor" AS ENUM ('WHITE', 'TAN', 'BROWN', 'DARK', 'BLACK');

-- CreateEnum
CREATE TYPE "AvatarGender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('HEAD', 'SHIRT', 'PANTS', 'SHOES', 'EXTRA');

-- CreateTable
CREATE TABLE "Avatar" (
    "id" TEXT NOT NULL,
    "skinColor" "AvatarSkinColor" NOT NULL,
    "gender" "AvatarGender" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "ItemType" NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AvatarItems" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AvatarItems_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_userId_key" ON "Avatar"("userId");

-- CreateIndex
CREATE INDEX "_AvatarItems_B_index" ON "_AvatarItems"("B");

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AvatarItems" ADD CONSTRAINT "_AvatarItems_A_fkey" FOREIGN KEY ("A") REFERENCES "Avatar"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AvatarItems" ADD CONSTRAINT "_AvatarItems_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
