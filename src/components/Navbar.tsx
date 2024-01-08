'use client'

import { useState } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineDashboard } from "react-icons/ai";
import { LuPencil } from "react-icons/lu";
import { MdKeyboardArrowRight } from "react-icons/md";
// import { VscGraphLine } from "react-icons/vsc";
// import { IoCalendarOutline } from "react-icons/io5";
// import { IoSettings } from "react-icons/io5";

type Navlink = {
    href: string;
    icon: React.ReactNode;
    label: string;
    isExpanded: boolean;
}

function NavLink({ href, icon, label, isExpanded }: Navlink) {
    const pathname  = usePathname();
    const isActive = pathname.startsWith(href) ? true :  false;

    
    return (
        <Link href={href} className={`mb-2 flex cursor-pointer rounded-xl  h-[60px] pb-0.5 duration-300
            ${isExpanded ? 'w-[160px] items-center pl-4' : 'flex-col w-[80px] items-center justify-center'} 
            ${isActive ? 'bg-primary-light border-primary-light hover:bg-primary-light-hover hover:border-primary-light-hover': 'hover:bg-drop-bg hover:border-primary-light'}`}
        >
            {icon}
            <span className={`text-primary font-bold ${isExpanded ? 'text-sm ml-3' : 'text-[10px]'}`}>{label}</span>
        </Link>
    );
}

export default function Navbar() {
    const [isExpanded, setIsExpanded] = useState(false);

    const navLinksProps = [
        { href: "/dashboard", icon: AiOutlineDashboard, label: "Dashboard" },
        { href: "/study", icon: LuPencil, label: "Study" },
    ];

    function handleNavbarExpansion() {
        setIsExpanded(!isExpanded); 
    }

    return (
        <nav>
            {/* span button */}
            <span className={`flex fixed items-center justify-center cursor-pointer bg-white top-12 rounded-full
                tablet:duration-300  z-10 transform -translate-y-1/2 border border-nav-edge text-sub-text w-8 h-8 hover:bg-drop-bg
                ${isExpanded ? 'tablet:left-[184px]' : 'tablet:left-[84px]'}`}
                onClick={handleNavbarExpansion}
            >
                <MdKeyboardArrowRight className={`duration-300 w-6 h-6 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}/>
            </span>
            {/* navbar */}
            <div className={`flex flex-col items-center border-r-[1px] bg-white border-nav-edge fixed top-0 bottom-0 duration-300 overflow-y-auto text-center
                ${isExpanded ? 'w-[200px]' : 'w-[100px]'}`}
            >
                {/* navbar title*/}
                <div className='my-8 flex items-center'>
                    <p className='inline-block text-sm text-primary-light font-bold'>Study<br/>Assistant</p>
                </div>
                {/* navigation links */}
                <div className='px-[5px]'>
                    {navLinksProps.map((link, index) => (
                        <NavLink
                            key={index}
                            href={link.href}
                            icon={<link.icon className='w-8 h-8 text-primary' />}
                            label={link.label}
                            isExpanded={isExpanded}
                        />
                    ))}
                </div>
            </div>
        </nav>
    )
}