import SingleDetail from './SingleDetail';
// import OptionButton from './OptionBUtton';
import { daysLeftConversion } from '@/utils/dateProcess';
import { VscFolder } from "react-icons/vsc";
import prisma from '../../../lib/prisma';

type Props = {
    title: string;
    deck_id: number;
    last_review_date:  Date | null;
}

export default async function Deck({title, deck_id, last_review_date}: Props) {
    const cardCount = await prisma.card.count({
        where: {
            deck_id: Number(deck_id),
        },
    });

    const mastery = await prisma.masteryTracking.findFirst({
        where: {
            deck_id: deck_id,
        },
        orderBy: {
            timestamp: 'desc',
        },
    });

    return (
        <div className='flex justify-between px-2 pb-3 mb-6 border-b-2 border-nav-edge'>
            <p className='flex items-center font-bold mr-16 ml-4'>
                <VscFolder className='mr-2 w-5 h-5'/>
                {title}
            </p>
            <div className='flex'>
                <SingleDetail title='Mastery' value={String(mastery?.mastery)} unit='%' className='border-l px-5'/>
                {last_review_date ? (
                    <SingleDetail title='Last reviewed' value={daysLeftConversion(last_review_date)} unit='days ago' className='border-l px-5'/>
                ) : (
                    <SingleDetail title='Last reviewed' value='Not reviewed' className='border-l px-5'/>
                )}
                <SingleDetail title='No.' value={String(cardCount)} unit='cards' className='border-l px-5'/>
            </div>
        </div>
    )
}