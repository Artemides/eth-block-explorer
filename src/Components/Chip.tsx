import React from "react";

type ChipProps = {
    title: string;
    value: any;
    description?: string;
    onClick?: () => void;
    highlight?: boolean;
};
export const Chip = ({
    title,
    value,
    description,
    highlight,
    onClick,
}: ChipProps) => {
    return (
        <>
            <span className="text-gray-200">{title} : </span>
            <span
                className={
                    highlight
                        ? "font-semibold text-sky-400 cursor-pointer hover:text-sky-500"
                        : "break-all"
                }
                onClick={onClick}
            >
                {value} {description && description}
            </span>
        </>
    );
};
