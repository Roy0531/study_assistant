import Container from '@/components/Container';
import FlashCard from "@/components/study_cmp/FlashCard";
import prisma from '../../../../../lib/prisma';
import UpdateStudyForm from "@/components/study_cmp/UpdateStudyForm";

type StudyCardProps = {
    card_id: number;
    front_content: string;
    back_content: string;
    confidence: string;
}

export default async function Review({searchParams}:{
    searchParams: {
        deckId: number;
    };

}){
    const cards = await prisma.card.findMany({
        where: {
            deck_id: Number(searchParams.deckId),
        },
    });

    return (
        <Container className='flex flex-col justify-center items-center bg-backgound'>
            <ul className='mx-10 mb-6'>
                {cards?.map((card: StudyCardProps) => (
                    <li key={card.card_id} className="flex flex-col items-center">
                        <FlashCard
                            front={card.front_content}
                            back={card.back_content}
                            showOption={false}
                        />
                        <UpdateStudyForm card_id={ card.card_id } confidence={card.confidence} deck_id={Number(searchParams.deckId)}/>
                    </li>
                ))}
            </ul>
        </Container>
    )
}