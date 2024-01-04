'use server'

import React from 'react'
import Container from '@/components/Container'
import Deck from '@/components/study_cmp/Deck'
import FlashcardForm from '@/components/study_cmp/FlashcardForm'
import { dateConversion } from "@/utils/dateProcess";
import FlashCard from '@/components/study_cmp/FlashCard'
import prisma from '../../../../lib/prisma'

type CardProps = {
    card_id: number;
    front_content: string;
    back_content: string;
    count: number;
    created_at: Date;
}

export default async function Flashcards({ params }: {
    params: { deckId: string };
}) {
    //Todo: also fetch next_date and condifence for each card
    const cards = await prisma.card.findMany({
        where: {
            deck_id: Number(params.deckId),
        },
    });

    return (
        <Container className='flex flex-col justify-center bg-backgound'>
            <div className='mx-auto mt-8'>
                <Deck deckName='AI Concept' withButtons={false}/> 
            </div>
            <div className='flex items-center justify-center gap-4 mx-14'>
                    <p className='text-xs underline underline-offset-1'>Mastery Criteria</p>
                    <p className='text-[10px] text-white rounded-full py-0.5 px-4 bg-bad'>Bad</p>
                    <p className='text-[10px] text-white rounded-full py-0.5 px-4 bg-good'>Good</p>
                    <p className='text-[10px] text-white rounded-full py-0.5 px-4 bg-perfect'>Perfect</p>
            </div>
            <FlashcardForm deckId={params.deckId}/>
            <ul className='mx-10 mb-6'>
                {cards?.map((card:CardProps) => (
                    <li key={card.card_id}>
                        <FlashCard 
                            front={card.front_content} 
                            back={card.back_content} 
                            date_added={dateConversion(card.created_at)} 
                            count={card.count}
                            //Todo: replace with the actual value
                            next_date={"card.next_date"}
                            confidence={"card.confidence"}/>
                    </li>
                ))}
            </ul>
        </Container>
    )
}