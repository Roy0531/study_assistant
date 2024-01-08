'use server'

import React from 'react'
import Container from '@/components/Container'
import Deck from '@/components/study_cmp/Deck'
import FlashcardForm from '@/components/study_cmp/FlashcardForm'
import { dateConversion } from "@/utils/dateProcess";
import FlashCard from '@/components/study_cmp/FlashCard'
import Link from 'next/link';
import prisma from '../../../../lib/prisma'
import Button from '@/components/Button'


type CardProps = {
    card_id: number;
    front_content: string;
    back_content: string;
    count: number;
    created_at: Date;
    last_review_date: Date;
    confidence: string;
}

export default async function Flashcards({ params }: {
    params: { deckId: string };
}) {
    const cards = await prisma.card.findMany({
        where: {
            deck_id: Number(params.deckId),
        },
    });

    const deck = await prisma.deck.findFirst({
        where: {
            deck_id: Number(params.deckId),
        },
    });

    if (!deck) {
        return <p>Deck not found</p>;
    }
    return (
        <Container className='flex flex-col justify-center bg-backgound'>
            <div className='mx-auto mt-8'>
                <Deck
                    deckName={deck.title} 
                    deck_id={deck.deck_id} 
                    withButtons={false} 
                    last_review_date={deck.last_review_date ? String(deck.last_review_date) : 'Not reviewed'} 
                    next_review_date={deck.next_review_date ? String(deck.next_review_date) : 'Not reviewed'}
                />
            </div>
            <FlashcardForm deckId={params.deckId}/>
            {cards?.length > 0 ? (
                <>
                    <div className='flex justify-end mt-2'>
                        <Button color='bg-primary' value={<Link href={{
                            pathname:`/study/${params.deckId}/review`,
                            query:{
                                deckId: params.deckId,
                            }
                        }}>Review</Link>}
                        className=' hover:bg-primary-hover'/>
                    </div>
                    <ul className='mx-10 mb-6'>
                        {cards?.map((card:CardProps) => (
                            <li key={card.card_id}>
                                <FlashCard 
                                    front={card.front_content} 
                                    back={card.back_content} 
                                    date_added={dateConversion(card.created_at)} 
                                    count={card.count}
                                    last_review_date={dateConversion(card.last_review_date)}
                                    confidence={card.confidence}
                                    showOption={true}/>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <div className='text-center my-10'>
                    <p className='font-bold'>No Cards has been Created</p>
                </div>
            )}
        </Container>
    )
}