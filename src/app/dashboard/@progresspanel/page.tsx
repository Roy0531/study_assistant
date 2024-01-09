import ProgressItems from '@/components/dashboard_cmp/ProgressItems';
import prisma from '../../../../lib/prisma';

export default async function ProgressPanel() {
    const decks = await prisma.deck.findMany();
    
    return (
        <>
            <ProgressItems decks={decks}/>
        </>
    )
}