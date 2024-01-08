"use server"

import prisma from '../../lib/prisma'

type UpdateStudyRecordActionProp = {
    formData: FormData;
    card_id: number;
    deck_id: number;
}

export const updateStudyRecord = async ({ formData, card_id, deck_id } : UpdateStudyRecordActionProp) => {
    const flashcardsData = await prisma.card.update({
        where: {
            card_id: card_id,
        },
        data: {
            confidence: formData.get("confidence") as string,
            last_review_date: new Date(),
            count: {
                increment: 1
            }
        },
    });

    // const deckData = await prisma.deck.update({
    //     where: {
    //         deck_id: deck_id,
    //     },
    // })

    return {
        success: true,
        flashcardsData,
    };
}