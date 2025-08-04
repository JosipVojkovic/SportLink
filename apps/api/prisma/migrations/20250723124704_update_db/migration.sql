/*
  Warnings:

  - Added the required column `environment` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surface` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GameSurface" AS ENUM ('TURF', 'CONCRETE', 'SAND', 'GRASS', 'PARKET', 'RUBBER');

-- CreateEnum
CREATE TYPE "GameEnvironment" AS ENUM ('INDOOR', 'OUTDOOR');

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "environment" "GameEnvironment" NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "surface" "GameSurface" NOT NULL;
