"use server"

import prisma from '../../lib/prisma';

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
            mastery: Number(formData.get("mastery")) as unknown as number,
            last_review_date: new Date(),
            count: {
                increment: 1
            }
        },
    });

    return {
        success: true,
        flashcardsData,
    };
}