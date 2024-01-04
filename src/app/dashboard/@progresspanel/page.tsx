

import RadialProgressBar from "@/components/dashboard_cmp/RadialProgressBar"
import DataChart from "@/components/dashboard_cmp/DataChart"
import DeckCheckList from "@/components/dashboard_cmp/DeckCheckList"
import Trend from "@/components/dashboard_cmp/Trend"
import { lineChartData } from '@/utils/mockData'

type Props = {}

export default function ProgressPanel({}: Props) {
    //Todo: number of fech mastered and unmastered cards
    //Todo: link the selected deck and trend, progress bar, and the chart
    return (
        <>
            <p className="font-bold">Progress</p>
            <div className="flex items-center flex-wrap">
                <div className="basis-1/2">
                    {/* //Todo: add function that return data */}
                    <DataChart type={'line'} data={lineChartData}/>
                </div>
                <div className="basis-1/4 flex flex-col items-center">
                    {/* //Todo: replace masteredCardNo and  totalCardNo*/}
                    <RadialProgressBar circularWidth={100} masteredCardNo={30} totalCardNo={68}/>
                    {/* //Todo: replace percentage */}
                    {/* //Todo: replace trending */}
                    <Trend percentage={40} range='week' trending={'flat'}/>
                    <Trend percentage={40} range='month' trending={'up'}/>
                </div> 
                <div className="basis-1/4">
                    <DeckCheckList /> 
                </div>
            </div>
        </>
    )
}