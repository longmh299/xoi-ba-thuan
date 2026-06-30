/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `banners` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `foods` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "banners_title_key" ON "banners"("title");

-- CreateIndex
CREATE UNIQUE INDEX "foods_name_key" ON "foods"("name");
