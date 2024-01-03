'use client'

import ReactCardFlip from 'react-card-flip'
import SingleDetail from './SingleDetail';
import { useState } from 'react'

type Props = {
    front: string;
    back: string;
}

export default function SingleFlashCard({front, back}: Props) {
    const [isFlipped, setIsFlipped] = useState(false);

    function flipCard() {
    setIsFlipped(!isFlipped);
    }

    return (
        <div className='flex my-8'>
            <ReactCardFlip flipDirection='vertical' isFlipped={isFlipped}>
                <div className='w-[540px] h-[270px] border-[1px] rounded-lg' 
                onClick={flipCard}>
                    <p>{front}</p>
                </div>
                <div className='w-[540px] h-[270px] border-[1px] rounded-lg' 
                onClick={flipCard}>
                    <p>{back}</p>
                </div>
            </ReactCardFlip>
            <div className='flex flex-col justify-between mx-auto my-4'>
                <SingleDetail title='Added on' value='Dec 15 th' className='border-b'/>
                <SingleDetail title='Last reviewed on' value='Jan 10 th' className='border-b'/>
                <SingleDetail title='No. reviewed' value='6' unit='times' className='border-b'/>
                <SingleDetail title='Mastery' value="Good" className='border-b'/>
            </div>
        </div>
    )
}