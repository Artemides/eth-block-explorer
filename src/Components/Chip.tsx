import React from "react";

type ChipProps = {
    title: string;
    value: any;
    description?: string;
    highlight?: boolean;
};
export const Chip = ({ title, value, description, highlight }: ChipProps) => {
    return (
        <>
            <span className="text-gray-200">{title} : </span>
            <span
                className={
                    highlight
                        ? "font-semibold text-sky-400 cursor-pointer hover:text-sky-500"
                        : "break-all"
                }
            >
                {value} {description && description}
            </span>
        </>
    );
};
