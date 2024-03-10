/*
  Warnings:

  - You are about to drop the column `blogImage` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "blogImage";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profileImage";
