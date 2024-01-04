import { RxDotFilled } from "react-icons/rx";
import { dateConversion, daysLeftConversion } from "@/utils/dateProcess";
import prisma from '../../../../lib/prisma'

type scheduleProps = {
    schedule_id: number;
    event_title: string;
    due_date: Date;
}

type SingleDueProps = {
    event: string;
    due: string;
    daysLeft: number;
}

function SingleDue({event, due, daysLeft}:SingleDueProps){
    return (
        <div className="flex">
            <span className="flex flex-col items-center mr-8">
                <RxDotFilled className='text-2xl text-perfect'/>
                <div className="h-8 bg-nav-edge w-1 rounded-full"/>
            </span>
            <div className="flex flex-col">
                <p className={'font-bold text-sm'}>{event}</p>
                <p className={'text-[10px]'}>{due}</p>
                <p className={'text-[10px] text-down'}>{daysLeft} days left</p>
            </div>
        </div>
    )
}

export default async function TimelinePanel() {
    const scheduleData =  await prisma.schedule.findMany({
        orderBy: {
            due_date: 'asc',
        },
    });

    return (
        <>
            <p className="font-bold mb-4">Due Timeline</p>
            <ul className='h-[240px] overflow-auto'>
                {scheduleData?.map((schedule:scheduleProps) => (
                    <li key={schedule.schedule_id}>
                        <SingleDue event={schedule.event_title} due={dateConversion(schedule.due_date)} daysLeft={daysLeftConversion(schedule.due_date)}/>
                    </li>
                ))}
            </ul>
        </>
    )
}