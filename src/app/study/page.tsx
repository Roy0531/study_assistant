'use server'

import Container from '@/components/Container'
import DeckForm from '@/components/study_cmp/DeckForm'
import Deck from '@/components/study_cmp/Deck'
import prisma from '../../../lib/prisma'

type DeckProps = {
    title: string;
    deck_id: number;
    // card_number: number;
    // last_date: Date;
    // next_date: Date;
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
                {decks?.map((deck:DeckProps) => (
                    <li key={deck.deck_id}>
                        <Deck deckName={deck.title} deck_id={deck.deck_id} withButtons={true}/>
                    </li>
                ))}
            </ul>
        </Container>
    )
}