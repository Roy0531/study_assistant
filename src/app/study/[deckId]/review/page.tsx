import Container from '@/components/Container';
import StudyFlashcard from '@/components/study_cmp/StudyFlashcard';
import prisma from '../../../../../lib/prisma'

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
            <StudyFlashcard cards={cards}/>
        </Container>
    )
}