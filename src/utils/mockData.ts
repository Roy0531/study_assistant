import { months } from "@/utils/helper";

export const lineChartData = {
    labels: months({ count: 12 }),
    datasets: [
        {
        label: "Mastery Level",
        data: [65, 59, 80, 81, 56, 55, 60, 49, 112, 72, 52, 43],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        },
    ],
};