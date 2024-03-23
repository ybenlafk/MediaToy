-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "googleId" TEXT,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "picture" TEXT DEFAULT 'https://i.ibb.co/FsdsTYc/s-Instagram-photo-Soulless-Manga-Jujutsu-Kaisen-Artist-syrnrr-CLa5z-N2l-D1-L-JPG.jpg',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_userToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_userToUser_AB_unique" ON "_userToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_userToUser_B_index" ON "_userToUser"("B");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userToUser" ADD CONSTRAINT "_userToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userToUser" ADD CONSTRAINT "_userToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
