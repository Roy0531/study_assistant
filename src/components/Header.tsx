'use client'

import { PiUserCircleLight } from "react-icons/pi";
import { VscBell } from "react-icons/vsc";

type Props = {}

export default function Header({}: Props) {
    return (
        <header className='flex items-center justify-end top-0 h-12 sticky bg-table-hd py-2 px-4'>
            <div className='flex items-center gap-2'>
                <button className='flex justify-center items-center hover:bg-drop-bg rounded-full w-5 h-5 duration-300 mt-1'>
                    <VscBell VscBell className='w-4 h-4 text-sub-text'/>
                </button>
                <button className='flex justify-center items-center hover:bg-drop-bg rounded-full w-9 h-9 duration-300'>
                    <PiUserCircleLight className='w-8 h-8 text-sub-text'/>
                </button>
            </div>
        </header>
    )
}