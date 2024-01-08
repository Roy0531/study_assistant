'use client'

import DataChart from "@/components/dashboard_cmp/DataChart"
import DeckList from "@/components/dashboard_cmp/DeckList"
import RadialProgressBar from "@/components/dashboard_cmp/RadialProgressBar"
import Trend from "@/components/dashboard_cmp/Trend"
import { lineChartData } from '@/utils/mockData'
import { useState } from "react"

type DeckProps = {
    deck_id: number;
    title: string;
}

type ChartSectionProps = {
    decks: DeckProps[];
}

export default function ChartSectopm({ decks }: ChartSectionProps ) {
    const [ deck, setDeck ] = useState<number | null>(null);
    return (
        <div className="flex items-center gap-4">
                <div className="basis-1/2">
                    <DataChart deckId={deck} />
                </div>
                <div className="basis-1/4">
                    <DeckList decks={decks} setDeck={setDeck}/> 
                </div>
                <div className="basis-1/4 flex flex-col items-center">
                    <RadialProgressBar circularWidth={100} deckId={deck}/>
                    {/* <Trend deckId={deck} range="week"/> */}
                    {/* <Trend deckId={deck} range="month"/> */}
                </div> 
        </div>
    )
}
