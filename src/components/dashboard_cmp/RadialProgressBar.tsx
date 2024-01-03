import React from 'react'
import '@/styles/radicalProgressBar.css'
type Props = {
    
    circularWidth: number;
    masteredCardNo: number;
    totalCardNo: number;
}

export default function RadialProgressBar({circularWidth, masteredCardNo, totalCardNo}: Props) {
    const radius = 40
    const percentage = Math.round((masteredCardNo / totalCardNo) * 100)
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - (dashArray * percentage) / 200;
    return (
        <>
            <p className="text-[10px] font-bold self-start ml-16">Mastery</p>
            <svg 
                width={circularWidth}
                height={circularWidth}
                viewBox={`0 0 ${circularWidth} ${circularWidth}`}
            >
                <defs>
                    <linearGradient id='gradient'>
                        <stop offset='10%' stop-color='#97DDF4'/>
                        <stop offset='50%' stop-color='#50CBF2'/>
                        <stop offset='100%' stop-color='#2B8BB5'/>
                    </linearGradient>
                </defs>

                <circle 
                    cx={circularWidth / 2} 
                    cy={circularWidth / 2} 
                    strokeWidth='16px' 
                    r={radius}
                    className="circle-background" 
                    transform={`rotate(180, ${circularWidth / 2} ${circularWidth / 2})`}
                    strokeDasharray={Math.PI * radius * 2}
                    strokeDashoffset={Math.PI * radius}
                />

                <circle 
                    cx={circularWidth / 2} 
                    cy={circularWidth / 2} 
                    strokeWidth='16px' 
                    r={radius}
                    className="circle-progress" 
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset} 
                    transform={`rotate(180, ${circularWidth / 2} ${circularWidth / 2})`}
                    stroke='url(#gradient)'
                />

                <text x='50%' y='45%' dy='0.3em' textAnchor='middle' className='circular-text'>
                    {percentage} %
                </text>
                <text x='55%' y='60%' dx='-0.8em' dy='0.8em' textAnchor='middle' className='mastery-text'>
                    {masteredCardNo} / {totalCardNo} cards
                </text>
            </svg>
        </>
    )
}