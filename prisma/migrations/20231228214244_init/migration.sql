-- CreateTable
CREATE TABLE "Deck" (
    "deck_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("deck_id")
);

-- CreateTable
CREATE TABLE "Card" (
    "card_id" SERIAL NOT NULL,
    "front_content" TEXT NOT NULL,
    "back_content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_review_date" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL,
    "confidence_level" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "deck_id" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("card_id")
);

-- CreateTable
CREATE TABLE "MasteryTracking" (
    "tracking_id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "mastery" DOUBLE PRECISION NOT NULL,
    "deck_id" INTEGER NOT NULL,

    CONSTRAINT "MasteryTracking_pkey" PRIMARY KEY ("tracking_id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "schedule_id" SERIAL NOT NULL,
    "event_type" TEXT NOT NULL,
    "event_title" TEXT NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deck_id" INTEGER NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("schedule_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_deck_id_key" ON "Schedule"("deck_id");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "Deck"("deck_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasteryTracking" ADD CONSTRAINT "MasteryTracking_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "Deck"("deck_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "Deck"("deck_id") ON DELETE RESTRICT ON UPDATE CASCADE;
