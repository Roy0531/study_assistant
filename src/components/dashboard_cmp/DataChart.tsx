"use client";

import { getMastery } from '@/actions/get-mastery-action';
import ChartTabs from "@/components/dashboard_cmp/ChartTabs";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

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
    deck_id : number | null;
}

const dateFormatOption: Intl.DateTimeFormatOptions = {
    month: 'numeric',
    day: 'numeric',
};

type MasterySetProps = {
    reviewedDate: string;
    mastery: number | null;
};

export default function DataChart({ deck_id }: DataChartProps) {
    const [range, setRange] = useState(7);
    const [masterySets, setMasterySets] = useState<MasterySetProps[]>([]);

    useEffect(() => {
        const masteryData = async () => {
            const masteryList = await getMastery({deck_id, range});
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
    }, [range, deck_id])

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

    return (
        <>
            <p className="font-bold">Progress</p>
            <ChartTabs setRange={setRange} />
            <div className="h-screen-60">
                <Line options={options} data={data} />
            </div>
        </>
    );
}

