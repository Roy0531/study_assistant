import Container from "@/components/Container";
import { PiCardsLight } from "react-icons/pi";
import prisma from '../../../lib/prisma';
import { VscFolder } from "react-icons/vsc";
import CardPanel from "@/components/dashboard_cmp/CardPanel";

export default async function DashboardLayout({
    children,
    progresspanel,
    taskpanel,
    timelinepanel,
}: {
    children: React.ReactNode;
    progresspanel: React.ReactNode;
    timelinepanel: React.ReactNode;
    classpanel: React.ReactNode;
    taskpanel: React.ReactNode;
}) {
    const deckCount = await prisma.deck.count();
    const cardCount = await prisma.card.count();

    return (
        <div className="flex flex-col gap-8"> 
            <Container className=" h-[350px]">{progresspanel}</Container> 
            <div className="flex flex-wrap gap-4">
                <div className="flex flex-col justify-between w-1/3">
                    <CardPanel count={deckCount} text='in total' bg='bg-primary-light' color='text-primary' icon={<VscFolder className="w-12 h-12"/>}/>
                    <CardPanel count={cardCount} text='in total' bg='bg-secondary-light' color='text-secondary' icon={<PiCardsLight className="w-12 h-12"/>}/>
                </div>
                <Container className="flex-1 w-1/3">{timelinepanel}</Container>
                <Container className="flex-1 w-1/3">{taskpanel}</Container>               
            </div>
        </div>
    )
}
