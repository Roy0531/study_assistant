import { useEffect, useState } from 'react';
import '@/styles/radicalProgressBar.css';
import { getMastery } from '@/actions/get-mastery-action';

type Props = {
    circularWidth: number;
    deck_id: number | null;
}

export default function RadialProgressBar({circularWidth, deck_id}: Props) {
    const [percentage, setPercentage] = useState(0);
    const radius = 80
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - (dashArray * percentage) / 200;
    useEffect(() => {
        const masteryData = async () => {
            const mastery = await getMastery({deck_id: deck_id, range: 1});
            if (mastery !== null) {
                setPercentage(mastery[0].mastery)
            }
        }
        masteryData();
    },[deck_id])

    return (
        <>
            <p className="text-[14px] font-bold mb-4">Mastery</p>
            <svg 
                width={circularWidth}
                height={circularWidth}
                viewBox={`0 0 ${circularWidth} ${circularWidth}`}
            >
                <defs>
                    <linearGradient id='gradient'>
                        <stop offset='10%' stopColor='#97DDF4'/>
                        <stop offset='50%' stopColor='#50CBF2'/>
                        <stop offset='100%' stopColor='#2B8BB5'/>
                    </linearGradient>
                </defs>

                <circle 
                    cx={circularWidth / 2} 
                    cy={circularWidth / 2} 
                    strokeWidth='30px' 
                    r={radius}
                    className="circle-background" 
                    transform={`rotate(180, ${circularWidth / 2} ${circularWidth / 2})`}
                    strokeDasharray={Math.PI * radius * 2}
                    strokeDashoffset={Math.PI * radius}
                />

                <circle 
                    cx={circularWidth / 2} 
                    cy={circularWidth / 2} 
                    strokeWidth='30px' 
                    r={radius}
                    className="circle-progress" 
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset} 
                    transform={`rotate(180, ${circularWidth / 2} ${circularWidth / 2})`}
                    stroke='url(#gradient)'
                />

                <text x='50%' y='45%' dy='0.9em' textAnchor='middle' className='circular-text'>
                    {percentage} %
                </text>
            </svg>
        </>
    )
}