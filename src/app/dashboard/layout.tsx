import Container from "@/components/Container";
import CardPanel from "@/components/dashboard_cmp/CardPanel";
import TimelinePanel from "@/components/dashboard_cmp/Timeline";
import { PiCardsLight } from "react-icons/pi";
import { VscFolder } from "react-icons/vsc";
import prisma from '../../../lib/prisma';

export default async function DashboardLayout({
    progresspanel,
}: {
    children: React.ReactNode;
    progresspanel: React.ReactNode;
}) {
    const deckCount = await prisma.deck.count();
    const cardCount = await prisma.card.count();

    return (
        <div className="flex flex-col gap-8"> 
            <Container className=" h-[350px]">
                {progresspanel}
            </Container> 
            <div className="flex flex-wrap gap-4">
                <div className="flex flex-col justify-between w-1/2">
                    <CardPanel count={deckCount} text='in total' bg='bg-primary-light' color='text-primary' icon={<VscFolder className="w-12 h-12"/>}/>
                    <CardPanel count={cardCount} text='in total' bg='bg-secondary-light' color='text-secondary' icon={<PiCardsLight className="w-12 h-12"/>}/>
                </div>
                <Container className="flex-1 w-1/2">
                    <TimelinePanel />
                </Container>
            </div>
        </div>
    )
}
