'use server'

import { calculatePriority, depricateMastery } from '@/utils/logic';
import prisma from '../../lib/prisma';

export const updateMastery = async ( deck_id: number) => {
    const cards = await prisma.card.findMany({
        where: {
            deck_id: Number(deck_id),
        },
    });

    let totalMastery = 0;
    let latestReviewDate = null;

    if(cards.length > 0) {
        for (const card of cards) {
            const newMastery = depricateMastery(card.count, card.mastery, new Date(card.last_review_date));
            const newPriority = calculatePriority(card.count, newMastery);
            await prisma.card.update({
                where: { card_id: card.card_id },
                data: { 
                    mastery: newMastery,
                    priority: newPriority,
                },
            });
    
            totalMastery += newMastery;

            if (!latestReviewDate || card.last_review_date > latestReviewDate) {
                latestReviewDate = card.last_review_date;
            }
        }
    
        const averageMastery = Math.round((totalMastery / cards.length) * 10) / 10;
    
        await prisma.masteryTracking.create({
            data: {
                mastery: averageMastery,
                deck_id: deck_id,
            },
        });

        if (latestReviewDate) {
            
            await prisma.deck.update({
                where: { deck_id: deck_id },
                data: { last_review_date: latestReviewDate },
            });
        }
    }
};