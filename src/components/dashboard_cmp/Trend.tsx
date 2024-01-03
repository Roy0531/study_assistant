import React from 'react'
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { MdOutlineTrendingFlat } from "react-icons/md";

type Props = {
  percentage: number
  range: "week" | "month"
  trending: "up" | "flat" | "down";
}

export default function Trend({percentage, range, trending, }: Props) {
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