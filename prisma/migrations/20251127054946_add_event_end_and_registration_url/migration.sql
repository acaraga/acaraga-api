/*
  Warnings:

  - You are about to drop the column `registrationLink` on the `Event` table. All the data in the column will be lost.
  - Added the required column `dateTimeEnd` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "registrationLink",
ADD COLUMN     "dateTimeEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "registrationUrl" TEXT;
