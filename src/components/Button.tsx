import { cn } from "@/utils/cn";

type Props = {
    color?: string,
    value: string | JSX.Element,
    handleFunction?: () => void,
    className?: string;
}

export default function Button({color, value, handleFunction, className}: Props) {
    const containerClasses = cn(`h-6 px-3 py-0.5 pb-1 rounded-3xl text-xs text-white duration-300 ${color}`, className);
    return (
        <button className={containerClasses} onClick={handleFunction}>
            {value}
        </button>
    )
}