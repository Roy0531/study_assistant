import prisma from '../../../../lib/prisma'
import ChartSection from '@/components/dashboard_cmp/ProgressItems';

export default async function ProgressPanel() {
    const decks = await prisma.deck.findMany();
    
    return (
        <>
            <p className="font-bold">Progress</p>
            <ChartSection decks={decks}/>
        </>
    )
}