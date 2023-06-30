"use client";

import Table from "@/Components/Table";
import { AlchemyContext } from "@/Context/AlchemyProvider";
import { Block, BlockWithTransactions, TransactionResponse } from "alchemy-sdk";
import moment from "moment";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { BiTime, BiGasPump } from "react-icons/bi";
import { BsBox } from "react-icons/bs";

type BlockWithTransactionsProps = {
    blockHash: string;
};

const BlockWithTransactions = ({
    params,
}: {
    params: BlockWithTransactionsProps;
}) => {
    const { blockHash } = params;
    const { alchemy } = useContext(AlchemyContext) as AlchemyContext;

    const [block, setblock] = useState<BlockWithTransactions | null>(null);

    useEffect(() => {
        const retrieveTransactions = async () => {
            const blockWithTransactions =
                await alchemy.core.getBlockWithTransactions(blockHash);
            console.log({
                transactionssss: blockWithTransactions.transactions,
            });

            setblock(blockWithTransactions);
        };
        retrieveTransactions();
    }, [alchemy.core, blockHash]);

    const blockDate = useMemo(() => {
        if (!block) return new Date().toLocaleDateString();
        const date = moment(block.timestamp * 1000)
            .startOf("minute")
            .fromNow();
        return date;
    }, [block]);

    return (
        <article className="m-8 flex flex-col  gap-8">
            <h1 className="text-2xl font-bold">Transactions </h1>
            <div className="flex justify-around gap-4 px-4 py-8 ring-1 ring-sky-500/20 rounded-md ">
                <div className="text-3xl font-bold">
                    <BsBox size={32} className="inline-block align-top mr-2" />
                    <span>Block: #{block?.number}</span>
                </div>
                <div className="text-3xl font-bold">
                    <BiTime size={32} className="inline-block align-top mr-2" />
                    <span>Age: {blockDate}</span>
                </div>
                <div className="text-3xl font-bold">
                    <BiGasPump size={32} className="inline-block align-top" />
                    <span> Gas: {block?.gasUsed.toString()}</span>
                </div>
            </div>
            {block && (
                <div className="flex flex-col gap-2 8 ring-1 ring-sky-500/20 rounded-md">
                    <Table transactions={block.transactions} />
                </div>
            )}
        </article>
    );
};
export default BlockWithTransactions;
