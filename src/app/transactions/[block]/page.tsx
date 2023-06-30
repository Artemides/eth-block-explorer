"use client";

import Table from "@/Components/Table";
import { AlchemyContext } from "@/Context/AlchemyProvider";
import { TransactionResponse } from "alchemy-sdk";
import React, { useContext, useEffect, useState } from "react";

type BlockWithTransactionsProps = {
    blockNumber: string;
};

const BlockWithTransactions = ({
    params,
}: {
    params: BlockWithTransactionsProps;
}) => {
    const { blockNumber } = params;
    const { alchemy } = useContext(AlchemyContext) as AlchemyContext;
    const [blockTransactions, setBlockTransactions] = useState<
        TransactionResponse[]
    >([]);

    useEffect(() => {
        const retrieveTransactions = async () => {
            const blockWithTransactions =
                await alchemy.core.getBlockWithTransactions(blockNumber);
            console.log({ transactions: blockWithTransactions.transactions });
            setBlockTransactions(blockWithTransactions.transactions);
        };
        retrieveTransactions();
    }, [alchemy.core, blockNumber]);

    return (
        <div className="flex flex-col gap-2 m-8 ring-1 ring-sky-500/20 rounded-md">
            <Table transactions={blockTransactions} />
        </div>
    );
};
export default BlockWithTransactions;
