'use client'

import React from 'react'
import Button from '../Button';
import SingleDetail from './SingleDetail';
import { VscFolder } from "react-icons/vsc";
import { BsThreeDotsVertical } from "react-icons/bs";
import  Link  from 'next/link'

type Props = {
    deckName: string;
    deck_id?: number;
    withButtons: boolean
}

export default function Deck({deckName, deck_id, withButtons}: Props) {
    return (
        <div className='flex justify-between px-2 pb-3 mb-8 border-b-2 border-nav-edge'>
            <p className='flex items-center font-bold mr-16 ml-4'>
                <VscFolder className='mr-2 w-5 h-5'/>
                {deckName}
            </p>
            <div className='flex'>
                <SingleDetail title='Mastery' value='40' unit='%' className='border-l px-5'/>
                <SingleDetail title='Last reviewed' value='5' unit='days ago' className='border-l px-5'/>
                <SingleDetail title='No.' value='40' unit='cards' className='border-l px-5'/>
                <SingleDetail title='Next review date' value='Feb 12 th' className='border-l px-5'/>
                {withButtons && <div className='flex gap-10 items-center ml-6'>
                    <Button color='bg-primary' value={<Link href={`/study/${deck_id}`}>Open</Link>}
                    className='hover:bg-primary-hover'/>
                    <Button value={<BsThreeDotsVertical className='w-4 h-4 text-sub-text'/>} 
                    className='hover:bg-drop-bg rounded-full'/>
                </div>}
            </div>
            
        </div>
    )
}