"use client";

import { getMastery } from '@/actions/get-mastery-action'
import { useEffect, useState } from 'react';
import ChartTabs from "@/components/dashboard_cmp/ChartTabs"
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type DataChartProps = {
    deckId : number | null;
}

const dateFormatOption: Intl.DateTimeFormatOptions = {
    month: 'numeric',
    day: 'numeric',
};

type MasterySetProps = {
    reviewedDate: string;
    mastery: number | null;
};

export default function DataChart({ deckId }: DataChartProps) {
    const [range, setRange] = useState(7);
    const [masterySets, setMasterySets] = useState<MasterySetProps[]>([]);

    useEffect(() => {
        const masteryData = async () => {
            const masteryList = await getMastery({deckId, range});
            const masterySet: MasterySetProps[] = [];
            masteryList?.forEach((record) => {
                const reviewedDate = new Date(record.timestamp).toLocaleDateString('en-US', dateFormatOption)
                masterySet.push({
                    reviewedDate: reviewedDate,
                    mastery: record.mastery,
                });
            });
            masterySet.sort((a, b) => {
                const x = new Date(a.reviewedDate);
                const y = new Date(b.reviewedDate);
                return x.getTime() - y.getTime();
            });
            setMasterySets(masterySet);
        };

        masteryData();
    }, [range, deckId])

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        spanGaps: true,
        scales: {
            y: {
                min: 0,
                max: 100,
            },
        },
        plugins: {
            legend: {display: false},
        },
    };

    const data = {
        labels: masterySets.map((record) => record['reviewedDate']),
        datasets: [
        {
            label: 'Mastery',
            data: masterySets.map((record) => record['mastery']),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        ],
    };
    console.log(data);

    return (
        <>
            <ChartTabs setRange={setRange} />
            <div className="h-screen-60 md:h-screen-3/4 w-auto">
                <Line options={options} data={data} />
            </div>
        </>
    );
}

