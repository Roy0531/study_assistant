"use client";

import { useRef, useEffect } from "react";
import { Chart, registerables, ChartConfiguration } from "chart.js";
import { months } from '@/utils/helper';

export default function DataChart(props: ChartConfiguration) {
    const { data, options } = props;
    const chartRef = useRef<HTMLCanvasElement>(null)
    const labels = months({ count: 7})
    useEffect(() => {
        if (chartRef.current) {
            const chart = new Chart(chartRef.current, {
                ...props,
                options: {
                    ...options
                },
            });
            return () => {
                chart.destroy();
            };
        }
    }, [data])
    return (
        <>
            <canvas ref={chartRef}/>
        </>
    );
}
Chart.register(...registerables);