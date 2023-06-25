import { type } from "os";
import React, { HTMLAttributes } from "react";

type EthBlockStatus =
    | "Pending"
    | "Mined"
    | "Confirmed"
    | "Orphaned"
    | "Finalized";
type BlockStatus = {
    status: EthBlockStatus;
};

type BlockStatusColors = {
    [key in EthBlockStatus]: {
        style: string;
    };
};
const BlockStatuses: BlockStatusColors = {
    Finalized: {
        style: "ring-green-500 text-green-500 bg-green-500/30",
    },
    Confirmed: {
        style: "",
    },
    Mined: {
        style: "",
    },
    Orphaned: {
        style: "",
    },
    Pending: {
        style: "",
    },
};
export const BlockStatus = ({ status }: BlockStatus) => {
    return (
        <div
            className={`px-2 py-[2px] rounded-full ring-1 text-xs ${BlockStatuses[status].style}`}
        >
            {status}
        </div>
    );
};
