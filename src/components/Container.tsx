import { cn } from "@/utils/cn";
import React from "react";

export default function Container(props: React.HTMLProps<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={cn(
                "bg-white rounded-xl shadow-md py-4 px-6",
                props.className
            )}
        />
    );
}
