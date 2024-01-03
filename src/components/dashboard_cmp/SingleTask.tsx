'use client'

import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useState } from 'react';

type SingleTaskProps = {
    task: string;
}

export default function SingleTask({ task }: SingleTaskProps) {
    const [completed, setCompleted] = useState(false);

    const handleToggle = () => {
    setCompleted(!completed);
    };

    return (
    <div className={`flex flex-row items-center p-2 border-b-2 border-nav-edge hover:cursor-pointer select-none ${completed ? 'line-through' : ''}`} onClick={handleToggle}>
        <IoCheckmarkDoneOutline
        className={`text-sm mr-4 ${completed ? 'text-perfect' : ''}`}
        />
        <p className={'font-bold text-sm'}>{task}</p>
    </div>
    );
}