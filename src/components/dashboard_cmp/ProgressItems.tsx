'use client'

import DataChart from "@/components/dashboard_cmp/DataChart"
import DeckList from "@/components/dashboard_cmp/DeckList"
import RadialProgressBar from "@/components/dashboard_cmp/RadialProgressBar"
import Trend from "@/components/dashboard_cmp/Trend"
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
        <div className="flex pt-10 gap-4">
                <div className="w-1/2">
                    <DataChart deck_id={deck} />
                </div>
                <div className="w-1/4 ">
                    <DeckList decks={decks} setDeck={setDeck}/> 
                </div>
                <div className="w-1/4 ">
                    <RadialProgressBar circularWidth={190} deck_id={deck}/>
                    {/* <Trend deck_id={deck} range={7}/> 
                    <Trend deck_id={deck} range={31}/> */}
                </div> 
        </div>
    )
}
