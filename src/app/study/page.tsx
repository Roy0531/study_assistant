'use server'

import Button from '@/components/Button'
import Container from '@/components/Container'
import Deck from '@/components/study_cmp/Deck'
import DeckForm from '@/components/study_cmp/DeckForm'
import Link from 'next/link'
import prisma from '../../../lib/prisma'

type DeckProps = {
    title: string;
    deck_id: number;
    // mastery: number;
    last_review_date: Date | null;
    next_review_date: Date | null;
}

export default async function Study() {
    const decks = await prisma.deck.findMany();
    const deckCount = await prisma.deck.count();
    
    return (
        <Container className='flex flex-col bg-white px-8 py-6'>
            <div className='flex justify-between'>
                <p className='text-lg font-bold'>Decks</p>
                <p className='text-lg underline underline-offset-2 mb-4'><span className='font-bold'>{deckCount}</span> decks</p>
            </div>
            <DeckForm />
            <ul className='mx-10 my-6'>
                {decks?.length > 0 ? (
                    decks.map((deck: DeckProps) => (
                        <li key={deck.deck_id} className='flex items-center justify-between'>
                            <div className='mr-6 w-full'>
                                <Deck 
                                    title={deck.title} 
                                    deck_id={deck.deck_id} 
                                    last_review_date={deck.last_review_date} 
                                    next_review_date={deck.next_review_date}
                                />
                            </div>
                            <Button 
                                color='bg-primary' 
                                value={<Link href={{
                                    pathname:`/study/${deck.deck_id}`,
                                    query: {
                                        deck_id: deck.deck_id,
                                        title: deck.title,
                                        // mastery: String(deck.mastery),
                                        last_review_date: deck.last_review_date ? String(deck.last_review_date) : null,
                                        next_review_date: deck.next_review_date ? String(deck.next_review_date) : null,
                                    },
                            }}>Open</Link>}
                        className='hover:bg-primary-hover mb-6'
                    />
                        </li>
                    ))
                ) : (
                    <div className='text-center'>
                        <p className='font-bold'>No Decks has been Created</p>
                    </div>
                )}
            </ul>
        </Container>
    )
}