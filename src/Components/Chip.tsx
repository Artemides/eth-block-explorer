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
            <span>{title}: </span>
            <span
                className={
                    highlight ? "font-semibold text-sky-400 " : "break-all"
                }
            >
                {value} {description && description}
            </span>
        </>
    );
};
