'use client'

import { useState } from "react"
import FlashCard from "./FlashCard";
import Button from "../Button";
import prisma from '../../../lib/prisma';

type CardStatus = 'bad' | 'good' | 'perfect';

type StudyCardProps = {
    card_id: number;
    front_content: string;
    back_content: string;
}

export default function StudyFlashcard({ cards }: { cards: StudyCardProps[] }) {
    const [cardStatuses, setCardStatuses] = useState(
        cards.reduce((acc, card) => ({ ...acc, [card.card_id]: null }), {})
    );

    const handleButtonClick = (cardId: number, status: CardStatus) => {
        setCardStatuses({ ...cardStatuses, [cardId]: status });
    };

    const handleCompleteClick = async () => {
        //Todo: call logic function here
        await prisma.card.updateMany({
            where: {
                card_id: { in: Object.keys(cardStatuses) },
            },
            data: {
                status: cardStatuses,
            },
        });
    };

    const allCardsReviewed = Object.values(cardStatuses).every(status => status !== null);

    return (
        <>
            <ul className='mx-10 mb-6'>
                {cards?.map((card: StudyCardProps) => (
                    <li key={card.card_id} className="flex flex-col items-center">
                        <FlashCard
                            front={card.front_content}
                            back={card.back_content}
                            showOption={false}
                        />
                        <div className='flex gap-20'>
                            <Button handleFunction={() => handleButtonClick(card.card_id, 'bad')} value='Bad' color='bg-bad' className='w-20 h-8 hover:bg-bad-hover' />
                            <Button handleFunction={() => handleButtonClick(card.card_id, 'good')} value='Good' color='bg-good' className='w-20 h-8 hover:bg-good-hover' />
                            <Button handleFunction={() => handleButtonClick(card.card_id, 'perfect')} value='Perfect' color='bg-perfect' className='w-20 h-8 hover:bg-perfect-hover' />
                        </div>
                    </li>
                ))}
            </ul>
            <div className="bg-nav-edge h-[1px] w-2/3 my-6"/>
            <button className="bg-primary text-white rounded-full px-4 py-1" disabled={!allCardsReviewed} onClick={handleCompleteClick}>Complete</button>
        </>
    )
}