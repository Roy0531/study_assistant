import Container from "@/components/Container";
import { VscFolder } from "react-icons/vsc";
import { PiCardsLight } from "react-icons/pi";
import prisma from '../../../lib/prisma'

type PanelDetailsProps = {
    count: number;
    text: string;
    bg: string;
    color: string;
    icon: React.ReactNode; 
}

function CardPanel({count, text, bg, color, icon }: PanelDetailsProps) {
    return (
        <div className={`flex items-center justify-center h-[100px] rounded-2xl ${bg} ${color}`}>
            <p className="font-bold text-3xl mr-4 ">{count}</p>
            <p className="mr-4">{text}</p>
            { icon }
        </div>
    )
}

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
    //Todo: fetch deck and card count for studying and mastered

    return (
        <div className="flex flex-col gap-8"> 
            <Container className=" h-[350px]">{progresspanel}</Container> 
            <div className="flex flex-wrap gap-4">
                <div className="flex gap-4 w-1/2">
                    <div className="flex flex-col gap-2 w-1/2">
                        <CardPanel count={deckCount} text='in total' bg='bg-primary-light' color='text-primary' icon={<VscFolder className="w-12 h-12"/>}/>
                        <CardPanel count={cardCount} text='in total' bg='bg-secondary-light' color='text-secondary' icon={<PiCardsLight className="w-12 h-12"/>}/>
                    </div>
                </div>
                <Container className="flex-1 w-1/4">{timelinepanel}</Container>
                <Container className="flex-1 w-1/4">{taskpanel}</Container>               
            </div>
        </div>
    )
}
