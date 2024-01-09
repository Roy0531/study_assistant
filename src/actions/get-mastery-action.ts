"use server"

import prisma from '../../lib/prisma'

type MasteryActionProp = {
    deck_id: number | null; 
    range: number;
}

export const getMastery = async ({ deck_id, range }: MasteryActionProp) => {
    if (deck_id === null) {
        return null;
    }

    // Fetch all records for the deck
    const allRecords = await prisma.masteryTracking.findMany({
        where: {
            deck_id: deck_id
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