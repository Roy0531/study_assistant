'use client'

import { useState } from "react"

export default function ChartTabs({ setRange }: { setRange: (range: number) => void }) {
    const [ selectedtab, setSelectedTab ] = useState('week');

    return (
        <div className="w-full">
            <ul className="flex flex-row gap-3 justify-center">
                <li>
                    <button className={`text-primary text-xs font-semibold rounded-sm px-10 duration-300 ${selectedtab === 'week' ? 'bg-primary-light hover:bg-primary-light-hover' : 'border border-primary-light hover:bg-primary-hover'}`}
                    onClick={(e) => {
                        e.preventDefault()
                        setSelectedTab('week');
                        setRange(7);
                    }}>
                        1 Week
                    </button>
                </li>
                <li>
                    <button className={`text-primary text-xs font-semibold rounded-sm px-10 duration-300 ${selectedtab === 'month' ? 'bg-primary-light hover:bg-primary-light-hover' : 'border border-primary-light hover:bg-primary-hover'}`}
                    onClick={(e) => {
                        e.preventDefault()
                        setSelectedTab('month');
                        setRange(31);
                    }}>
                        1 Month
                    </button>
                </li>
            </ul>
        </div>
    )
}
