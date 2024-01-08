"use server"

import prisma from '../../lib/prisma'
import { revalidatePath } from "next/cache"


export const addDeck = async (formData: FormData) => {
    const decksData = await prisma.deck.create({
        data: {
            title: formData.get("title") as string,
            schedule: {
                create: {
                    event_type: formData.get("type") as string,
                    event_title: formData.get("event") as string,
                    due_date: new Date(formData.get("date") as string),
                },
            },
            masteryTracking: {
                create: {},
            },
        },
    });

    revalidatePath('/study');

    return {
        success: true,
        decksData,
    };
}