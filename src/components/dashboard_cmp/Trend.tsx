
import { getMastery } from "@/actions/get-mastery-action";
import { useEffect, useState } from "react";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { MdOutlineTrendingFlat } from "react-icons/md";
import { differenceInDays } from 'date-fns';

type trending = "up" | "flat" | "down";

type Props = {
  deck_id: number | null;
  range: 7 | 31;
}

export default function Trend({ deck_id, range }: Props) {
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    const masteryData = async () => {
        const mastery = await getMastery({deck_id, range});
        if (mastery !== null) {
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          const oneMonthAgo = new Date();
          oneMonthAgo.setDate(oneMonthAgo.getDate() - 31);

          let closestWeekRecord = null;
          let closestMonthRecord = null;

          for (const record of mastery) {
              const daysFromWeekAgo = Math.abs(differenceInDays(record.timestamp, oneWeekAgo));
              const daysFromMonthAgo = Math.abs(differenceInDays(record.timestamp, oneMonthAgo));

              if (closestWeekRecord === null || daysFromWeekAgo < differenceInDays(closestWeekRecord.timestamp, oneWeekAgo)) {
                  closestWeekRecord = record;
              }

              if (closestMonthRecord === null || daysFromMonthAgo < differenceInDays(closestMonthRecord.timestamp, oneMonthAgo)) {
                  closestMonthRecord = record;
              }
          }

          if (range === 7 && closestWeekRecord !== null) {
              setPercentage(closestWeekRecord.mastery);
          }

          if (range === 31 && closestMonthRecord !== null) {
              setPercentage(closestMonthRecord.mastery);
          }
      }
    }
      
    masteryData();
  },[deck_id, range])
  return (  
    <>
      <div className={`w-10 h-10 flex items-center justify-center border-2 rounded-full mb-1
      ${trending === 'up' ? 'border-up' : trending === 'flat' ? 'border-flat' : 'border-down'}`}>
          {trending === "up" && <FiTrendingUp className='w-6 h-6'/>}
          {trending === "flat" && <MdOutlineTrendingFlat className='w-6 h-6'/>}
          {trending === "down" && <FiTrendingDown className='w-6 h-6'/>}
        </div>
        <p className='text-[10px] mb-2'>(+ {percentage} % from the last {range})</p>
    </>
  )
}