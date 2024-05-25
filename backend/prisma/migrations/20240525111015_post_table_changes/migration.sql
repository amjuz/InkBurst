/*
  Warnings:

  - Made the column `photoUrl` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "photoUrl" SET NOT NULL;
