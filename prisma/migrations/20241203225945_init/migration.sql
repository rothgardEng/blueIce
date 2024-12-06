-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(30) NOT NULL,
    "lastName" VARCHAR(30) NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "email" VARCHAR(70) NOT NULL,
    "isOverlord" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JoinUs" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "email" VARCHAR(70) NOT NULL,
    "memberships" TEXT NOT NULL,
    "phoneNumber" VARCHAR(14) NOT NULL,
    "interested" VARCHAR(50) NOT NULL,
    "referral" VARCHAR(20) NOT NULL,
    "contacted" BOOLEAN NOT NULL DEFAULT false,
    "assignedTo" TEXT,
    "contactedBy" TEXT,
    "hasParticipatedInAction" BOOLEAN NOT NULL DEFAULT false,
    "notes" VARCHAR(1000),

    CONSTRAINT "JoinUs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "titleSpanish" VARCHAR(50),
    "titleSpanishHowTranslated" VARCHAR(18) NOT NULL DEFAULT 'Google Translated',
    "body" VARCHAR(1000) NOT NULL,
    "bodySpanish" VARCHAR(1000),
    "bodySpanishHowTranslated" VARCHAR(18) NOT NULL DEFAULT 'Google Translated',
    "imageLink" TEXT NOT NULL,
    "imageAlt" VARCHAR(300) NOT NULL,
    "imageAltSpanish" VARCHAR(300) NOT NULL,
    "imageAltSpanishHowTranslated" VARCHAR(18) NOT NULL DEFAULT 'Google Translated',
    "link" TEXT NOT NULL,
    "anon" BOOLEAN NOT NULL,
    "typeA" VARCHAR(30) NOT NULL,
    "fileName" TEXT,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "titleSpanish" VARCHAR(50),
    "titleSpanishHowTranslated" VARCHAR(18) NOT NULL DEFAULT 'Google Translated',
    "bodySpanish" VARCHAR(1000),
    "bodySpanishHowTranslated" VARCHAR(18) NOT NULL DEFAULT 'Google Translated',
    "body" VARCHAR(1000) NOT NULL,
    "author" VARCHAR(40) NOT NULL,
    "genre" VARCHAR(50) NOT NULL,
    "typeA" VARCHAR(50) NOT NULL,
    "imageLink" TEXT NOT NULL,
    "imageAlt" VARCHAR(300) NOT NULL,
    "imageAltSpanish" VARCHAR(300) NOT NULL,
    "imageAltSpanishHowTranslated" VARCHAR(18) NOT NULL DEFAULT 'Google Translated',
    "link" TEXT NOT NULL,
    "anon" BOOLEAN NOT NULL,
    "fileName" TEXT,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orginization" (
    "id" SERIAL NOT NULL,
    "orgName" VARCHAR(50) NOT NULL,
    "imageLink" TEXT NOT NULL,
    "imageAlt" VARCHAR(300) NOT NULL,
    "imageAltSpanish" VARCHAR(300) NOT NULL,
    "imageAltSpanishHowTranslated" VARCHAR(18) NOT NULL DEFAULT 'Google Translated',
    "english" VARCHAR(500) NOT NULL,
    "spanish" VARCHAR(500),
    "descriptionSpanishHowTranslated" VARCHAR(18) NOT NULL DEFAULT 'Google Translated',
    "twitter" TEXT,
    "instagram" TEXT,
    "facebook" TEXT,
    "website" TEXT,

    CONSTRAINT "Orginization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "JoinUs_email_key" ON "JoinUs"("email");
