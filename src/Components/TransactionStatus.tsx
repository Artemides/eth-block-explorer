import React from "react";

export type TransactionStatus =
    | "pending"
    | "confirmed"
    | "failed"
    | "dropped"
    | "replaced"
    | "stuck"
    | "unknown";

type TxStatusColors = {
    [key in TransactionStatus]: {
        style: string;
    };
};
const TrnasactionStatus: TxStatusColors = {
    pending: {
        style: "ring-amber-500 text-amber-500 bg-amber-500/30",
    },
    confirmed: {
        style: "ring-green-500 text-green-500 bg-green-500/30",
    },
    failed: {
        style: "ring-red-500 text-red-500 bg-red-500/30",
    },
    dropped: {
        style: "ring-red-500 text-red-500 bg-red-500/30",
    },
    replaced: {
        style: "ring-amber-500 text-amber-500 bg-amber-500/30",
    },
    stuck: {
        style: "ring-red-500 text-red-500 bg-red-500/30",
    },
    unknown: {
        style: "ring-gray-500 text-gray-500 bg-gray-500/30",
    },
};

type TxStatus = {
    status: TransactionStatus;
};
const TransactionStatus = ({ status }: TxStatus) => {
    <div
        className={`px-2 py-[2px] rounded-full ring-1 text-xs ${TrnasactionStatus[status].style}`}
    >
        {status}
    </div>;
};

export default TransactionStatus;
