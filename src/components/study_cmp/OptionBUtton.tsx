'use client'

import { useState, useEffect, useRef } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function OptionButton() {
    const [showOptions, setShowOptions] = useState(false);
    const node = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (node.current && node.current.contains(e.target as Node)) {
            return;
        }
        setShowOptions(false);
    };

    useEffect(() => {
        if (showOptions) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showOptions]);

    return (
        <div className='relative inline-block text-left' ref={node}>
            <div>
                <button type='button'
                    className='hover:bg-drop-bg rounded-full p-2'
                    onClick={() => setShowOptions(!showOptions)}
                >
                    <BsThreeDotsVertical className='w-4 h-4 text-sub-text'/>
                </button>
            </div>
            {showOptions && (
                <div className='origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10'>
                    <div className='py-1' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
                        <button className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' role='menuitem'>Edit</button>
                        <button className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' role='menuitem'>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
}