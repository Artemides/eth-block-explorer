"use client";

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
            setBlockTransactions(blockWithTransactions.transactions);
        };
        retrieveTransactions();
    }, [alchemy.core, blockNumber]);

    return (
        <div className="flex flex-col gap-2 ">
            {blockTransactions.map((tx) => (
                <p key={tx.hash}>{tx.hash}</p>
            ))}
        </div>
    );
};
export default BlockWithTransactions;
