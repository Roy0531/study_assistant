import { cn } from "@/utils/cn";

type Props = {
    title: string;
    value: string;
    unit?: string;
    className?: string;
}

export default function SingleDetail({title, value, unit, className}:Props) {
    const containerClasses = cn('border-nav-edge', className);

    return (
        <div className={containerClasses}>
            <p className='text-[8px] font-bold'>{title}</p>
            <div className="text-center">
                <p className='px-4 text-[10px]'><span className="font-bold text-lg pr-1">{value}</span> {unit}</p>
            </div>
        </div>
    )
}

