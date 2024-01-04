'use client'

import ReactCardFlip from 'react-card-flip'
import SingleDetail from './SingleDetail';
import { useState } from 'react'

type Props = {
    front: string;
    back: string;
    date_added: string;
    count: number;
    next_date: string;
    confidence: string;
}

export default function SingleFlashCard({front, back, date_added, count, next_date, confidence}: Props) {
    const [isFlipped, setIsFlipped] = useState(false);

    function flipCard() {
    setIsFlipped(!isFlipped);
    }

    return (
        <div className='flex my-8'>
            <ReactCardFlip flipDirection='vertical' isFlipped={isFlipped} >
                <div className='flex items-center justify-center w-[540px] h-[270px] border-[1px] border-sub-text rounded-lg '
                onClick={flipCard}>
                    <p>{front}</p>
                </div>
                <div className='flex items-center justify-center w-[540px] h-[270px] border-[1px] border-sub-text rounded-lg' 
                onClick={flipCard}>
                    <p>{back}</p>
                </div>
            </ReactCardFlip>
            <div className='flex flex-col justify-between mx-auto my-4'>
                <SingleDetail title='Added on' value={date_added} className='border-b'/>
                <SingleDetail title='Last reviewed on' value={next_date} className='border-b'/>
                <SingleDetail title='No. reviewed' value={String(count)} unit='times' className='border-b'/>
                <SingleDetail title='Mastery' value={confidence} className='border-b'/>
            </div>
        </div>
    )
}