import Container from '@/components/Container';
import FlashCard from "@/components/study_cmp/FlashCard";
import UpdateStudyForm from "@/components/study_cmp/UpdateStudyForm";
import prisma from '../../../../../lib/prisma';
import Button from '@/components/Button';
import Link from 'next/link';

type StudyCardProps = {
    card_id: number;
    front_content: string;
    back_content: string;
    mastery: number;
}

export default async function Review({searchParams}:{
    searchParams: {
        deck_id: string;
    };
}){
    const cards = await prisma.card.findMany({
        where: {
            deck_id: Number(searchParams.deck_id),
        },
    });

    return (
        <>
            <Container className='flex flex-col justify-center items-center bg-backgound'>
                <ul className='mx-10 my-6'>
                    {cards?.map((card: StudyCardProps) => (
                        <li key={card.card_id} className="flex flex-col items-center">
                            <FlashCard
                                front={card.front_content}
                                back={card.back_content}
                                showOption={false}
                            />
                            <UpdateStudyForm card_id={ card.card_id } deck_id={Number(searchParams.deck_id)}/>
                        </li>
                    ))}
                </ul>
                <div className='mb-4'>
                    <Button color='bg-primary' className='m-auto' value={<Link href={`/study/${searchParams.deck_id}`}>Complete</Link>}/>
                </div>
            </Container>
            
        </>
    )
}