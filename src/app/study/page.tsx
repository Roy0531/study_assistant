'use server'

import Container from '@/components/Container'
import DeckForm from '@/components/study_cmp/DeckForm'
import Deck from '@/components/study_cmp/Deck'
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
                        <li key={deck.deck_id}>
                            <Deck 
                                deckName={deck.title} 
                                deck_id={deck.deck_id} 
                                withButtons={true} 
                                last_review_date={deck.last_review_date ? String(deck.last_review_date) : 'Not reviewed'} 
                                next_review_date={deck.next_review_date ? String(deck.next_review_date) : 'Not reviewed'}
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