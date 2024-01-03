import prisma from '../../../../lib/prisma'
import SingleTask from '@/components/dashboard_cmp/SingleTask';

export default async function TaskPanel() {
    //Todo: fetch and process data
    // const decks = await prisma.deck.findMany();

    return (
        <>
            <p className="font-bold mb-2">Tasks</p>
            <div className="h-[240px] overflow-auto">
                <SingleTask task="task"/>
                <SingleTask task="task"/>
                <SingleTask task="task"/>
            </div>
        </>
    )
}