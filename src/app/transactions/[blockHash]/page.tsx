"use client";

import Table from "@/Components/Table";
import { AlchemyContext } from "@/Context/AlchemyProvider";
import { Block, BlockWithTransactions, TransactionResponse } from "alchemy-sdk";
import moment from "moment";
import React, { useContext, useEffect, useMemo, useState } from "react";

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
    console.log({ blockHash });
    return (
        <article className="m-8 flex flex-col gap-8">
            <h1 className="text-2xl font-bold">Transactions </h1>
            <div className="flex gap-4 px-4 py-8 ring-1 ring-sky-500/20 rounded-md divide-x-2 divide-sky-500/30">
                <span className="text-3xl font-bold">
                    Block: #{block?.number}
                </span>
                <span className="text-3xl font-bold pl-4">
                    Age: {blockDate}
                </span>
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
