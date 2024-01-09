type PanelDetailsProps = {
    count: number;
    text: string;
    bg: string;
    color: string;
    icon: React.ReactNode; 
}

export default function CardPanel({count, text, bg, color, icon }: PanelDetailsProps) {
    return (
        <div className={`flex items-center justify-center h-[45%] rounded-2xl ${bg} ${color}`}>
            <p className="font-bold text-3xl mr-4 ">{count}</p>
            <p className="mr-4">{text}</p>
            { icon }
        </div>
    )
}