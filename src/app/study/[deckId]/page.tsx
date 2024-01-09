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

export default async function Flashcards({ searchParams }: {
    searchParams: { 
        deck_id: number,
        title: string,
        // mastery: String(deck.mastery),
        last_review_date: string | null,
        next_review_date: string | null,
    };
}) {

    const cards = await prisma.card.findMany({
        where: {
            deck_id: Number(searchParams.deck_id),
        },
    });

    return (
        <Container className='flex flex-col justify-center bg-backgound'>
            <div className='mx-auto mt-8'>
                <Deck
                    title={searchParams.title} 
                    deck_id={Number(searchParams.deck_id)}
                    last_review_date={searchParams.last_review_date ? new Date(searchParams.last_review_date) : null} 
                    next_review_date={searchParams.next_review_date ? new Date(searchParams.next_review_date): null}
                />
            </div>
            <FlashcardForm deck_id={Number(searchParams.deck_id)}/>
            {cards?.length > 0 ? (
                <>
                    <div className='flex justify-end mt-2'>
                        <Button color='bg-primary' value={<Link href={{
                            pathname:`/study/${searchParams.deck_id}/review`,
                            query:{
                                deck_id: searchParams.deck_id,
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
            <div className='mb-4'>
                <Button color='bg-primary' className='m-auto' value={<Link href='/study'>Go back to deck page</Link>}/>
            </div>
        </Container>
    )
}