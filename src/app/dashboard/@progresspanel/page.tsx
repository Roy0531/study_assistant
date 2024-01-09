import prisma from '../../../../lib/prisma'
import ProgressItems from '@/components/dashboard_cmp/ProgressItems';

export default async function ProgressPanel() {
    const decks = await prisma.deck.findMany();
    
    return (
        <>
            <ProgressItems decks={decks}/>
        </>
    )
}