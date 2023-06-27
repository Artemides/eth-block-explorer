import React from "react";

type DividerProps = {
    className?: string;
};

export const Divider = ({ className }: DividerProps) => {
    return <hr className={`my-4 border-gray-700 ${className}`} />;
};
