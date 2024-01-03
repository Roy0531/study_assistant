"use server"

import prisma from '../../lib/prisma'
import { revalidatePath } from "next/cache"

type FlashcardActionProp = {
    formData: FormData;
    deckId: string;
}

export const addFlashcard = async ({ formData, deckId } : FlashcardActionProp) => {
    const flashcardsData = await prisma.card.create({
        data: {
            front_content: formData.get("front") as string,
            back_content: formData.get("back") as string,
            created_at: new Date(),
            last_review_date: new Date(),
            count: 0,
            confidence_level: '100',
            priority: 0,
            deck_id: Number(deckId),
        },
    });

    revalidatePath('/study');

    return {
        success: true,
        flashcardsData,
    };
}