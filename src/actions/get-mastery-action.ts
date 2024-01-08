"use server"

import prisma from '../../lib/prisma'

type MasteryActionProp = {
    deckId: number | null; 
    range: number;
}

export const getMastery = async ({ deckId, range }: MasteryActionProp) => {
    // Return null if deckId is null
    if (deckId === null) {
        return null;
    }

    // Fetch all records for the deck
    const allRecords = await prisma.masteryTracking.findMany({
        where: {
            deck_id: deckId
        },
        orderBy: {
            timestamp: 'desc'
        }
    });

    // If there are fewer records than range, return all records
    if (allRecords.length < range) {
        return allRecords;
    }

    // Otherwise, return the specified number of records
    const masteryRecords = allRecords.slice(0, range);

    return masteryRecords;
}