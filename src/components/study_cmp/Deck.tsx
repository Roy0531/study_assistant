import React from 'react'
import Button from '../Button';
import SingleDetail from './SingleDetail';
// import OptionButton from './OptionBUtton';
import { VscFolder } from "react-icons/vsc";
import  Link  from 'next/link'
import prisma from '../../../lib/prisma'

type Props = {
    deckName: string;
    deck_id: number;
    withButtons: boolean;
    last_review_date: string;
    next_review_date: string
}

export default async function Deck({deckName, deck_id, withButtons, last_review_date, next_review_date}: Props) {
    const cardCount = await prisma.card.count({
        where: {
            deck_id: Number(deck_id),
        },
    });

    return (
        <div className='flex justify-between px-2 pb-3 mb-6 border-b-2 border-nav-edge'>
            <p className='flex items-center font-bold mr-16 ml-4'>
                <VscFolder className='mr-2 w-5 h-5'/>
                {deckName}
            </p>
            <div className='flex'>
                <SingleDetail title='Mastery' value='40' unit='%' className='border-l px-5'/>
                {last_review_date === 'Not reviewed' ? (
                    <SingleDetail title='Last reviewed' value='Not reviewed' className='border-l px-5'/>
                ) : (
                    <SingleDetail title='Last reviewed' value={last_review_date} unit='days ago' className='border-l px-5'/>
                )}
                <SingleDetail title='No.' value={String(cardCount)} unit='cards' className='border-l px-5'/>
                <SingleDetail title='Next review date' value={next_review_date} className='border-l px-5'/>
                {withButtons && <div className='flex gap-10 items-center ml-6'>
                    <Button color='bg-primary' value={<Link href={`/study/${deck_id}`}>Open</Link>}
                    className='hover:bg-primary-hover'/>
                </div>}
            </div>
            
        </div>
    )
}