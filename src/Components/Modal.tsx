import React, { PropsWithChildren, useState } from "react";

export const Modal = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState(true);
    const onClose = () => {
        setOpen(false);
    };
    if (!open) return null;

    return (
        <div className="absolute inset-0 grid place-items-center z-10 backdrop-blur-[2px]">
            <div className="relative bg-white rounded-sm">
                {children}
                <button className="absolute top-4 right-4" onClick={onClose}>
                    X
                </button>
            </div>
        </div>
    );
};
