import Button from '@/components/Button';
import Container from '@/components/Container';
import Deck from '@/components/study_cmp/Deck';
import FlashCard from '@/components/study_cmp/FlashCard';
import FlashcardForm from '@/components/study_cmp/FlashcardForm';
import { dateConversion } from "@/utils/dateProcess";
import Link from 'next/link';
import prisma from '../../../../lib/prisma';


type CardProps = {
    card_id: number;
    front_content: string;
    back_content: string;
    count: number;
    created_at: Date;
    last_review_date: Date;
    mastery: number;
}

export default async function Flashcards({ params }: { params: { deckId: string}}) {

    const deck = await prisma.deck.findFirst(
        {
            where: {
                deck_id: Number(params.deckId),
            },
        }
    )
    const cards = await prisma.card.findMany({
        where: {
            deck_id: Number(params.deckId),
        },
    });

    return (
        <Container className='flex flex-col justify-center bg-backgound'>
            <div className='mx-auto mt-8'>
                <Deck
                    title={deck!.title} 
                    deck_id={Number(params.deckId)}
                    last_review_date={deck?.last_review_date ? new Date(deck.last_review_date) : null} 
                />
            </div>
            <FlashcardForm deck_id={Number(params.deckId)}/>
            {cards?.length > 0 ? (
                <>
                    <div className='flex justify-end mt-2'>
                        <Button color='bg-primary' value={<Link href={{
                            pathname:`/study/${params.deckId}/review`,
                            query:{
                                deck_id: params.deckId
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
                                    mastery={card.mastery}
                                    showOption={true}
                                />
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