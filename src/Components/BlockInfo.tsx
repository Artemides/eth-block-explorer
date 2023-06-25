import { Block, BlockWithTransactions } from "alchemy-sdk";
import React, { useMemo } from "react";
import { BlockStatus } from "./BlockStatus";
import { BsBox } from "react-icons/bs";
import moment from "moment";

type BlockInfo = {
    block: BlockWithTransactions;
};

export const BlockInfo = ({ block }: BlockInfo) => {
    const contractTransactions = useMemo(() => {
        const transactioins = block.transactions;

        const contractTransactions = transactioins.reduce(
            (contracts, transaction) =>
                transaction.to && transaction ? contracts + 1 : contracts,
            0
        );
        return contractTransactions;
    }, [block.transactions]);

    const blockDate = useMemo(() => {
        const date = moment(block.timestamp * 1000).format(
            "MMMM Do YYYY, h:mm:ss a"
        );
        return date;
    }, [block.timestamp]);
    return (
        <div className="w-full bg-black/30 p-4 rounded-xl">
            <div
                id="block-info-header"
                className="flex justify-between gap-2 items-center"
            >
                <div>
                    <BsBox size={16} className="inline-block mr-2" />
                    <span className="font-semibold">{block.number}</span>
                </div>
                <BlockStatus status="Finalized" />
                <span>{blockDate}</span>
            </div>
            <div>
                <div className="flex gap-4">
                    <span>transactions: </span>{" "}
                    <span>{block.transactions.length} transactions</span>
                    <span>{contractTransactions} contract Transactions</span>
                </div>
            </div>
        </div>
    );
};
