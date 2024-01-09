import { dateConversion, daysLeftConversion } from "@/utils/dateProcess";
import { RxDotFilled } from "react-icons/rx";
import prisma from '../../../../lib/prisma';

type scheduleProps = {
    schedule_id: number;
    event_type: string;
    event_title: string;
    due_date: Date;
}

type SingleDueProps = {
    event: string;
    due: string;
    daysLeft: string;
    type: string;
}

function SingleDue({event, due, daysLeft, type}:SingleDueProps){
    return (
        <div className="flex">
            <span className="flex flex-col items-center mr-8">
                <RxDotFilled className={`text-2xl ${type === 'exam' ? 'text-bad' : type === 'hw' ? 'text-good' : 'text-perfect'} `}/>
                <div className="h-8 bg-nav-edge w-0.5 rounded-full"/>
            </span>
            <div className="flex flex-col">
                <p className={'font-bold text-sm'}>{event}</p>
                <p className={'text-[10px]'}>Due: {due}</p>
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
        <div className="px-4 py-2">
            <p className="font-bold  mb-4">Due Timeline</p>
            {scheduleData?.length > 0 ? (
                <ul className='h-[220px] overflow-auto'>
                    {scheduleData?.map((schedule:scheduleProps) => (
                        <li key={schedule.schedule_id}>
                            <SingleDue event={schedule.event_title} due={dateConversion(schedule.due_date)} type={schedule.event_type} daysLeft={daysLeftConversion(schedule.due_date)}/>
                        </li>
                    ))}
                </ul>
            ):(
                <div className='text-center my-10'>
                    <p className="text-xs font-bold">No due comming up!</p>
                </div>
            )}
        </div>
    )
}