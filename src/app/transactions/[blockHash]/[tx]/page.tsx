"use client";

import { Chip } from "@/Components/Chip";
import { Divider } from "@/Components/Divider";
import TransactionStatus from "@/Components/TransactionStatus";
import { AlchemyContext } from "@/Context/AlchemyProvider";
import {
    BigNumber,
    Block,
    BlockTag,
    TransactionReceipt,
    TransactionResponse,
    Utils,
} from "alchemy-sdk";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";

const Transaction = ({ params }: { params: { tx: string } }) => {
    const { alchemy } = useContext(AlchemyContext) as AlchemyContext;
    const { tx } = params;
    const [transaction, setTransaction] = useState<TransactionResponse | null>(
        null
    );
    const [transactionReceipt, setTransactionReceipt] =
        useState<TransactionReceipt | null>(null);

    const [block, setblock] = useState<Block | null>(null);
    useEffect(() => {
        if (!tx) return;
        const retrieveTransaction = async () => {
            const response = await alchemy.core.getTransaction(tx);
            const txReceipt = await alchemy.core.getTransactionReceipt(tx);
            console.log({ response });
            setTransactionReceipt(txReceipt);
            setTransaction(response);
            if (!response) return;

            const thisBlock = await alchemy.core.getBlock(
                response.blockHash as BlockTag
            );
            setblock(thisBlock);
        };
        retrieveTransaction();
    }, [alchemy.core, tx]);
    return (
        <section className="p-8">
            <h2 className="text-2xl font-bold mb-4">Transactions Details</h2>
            <article
                id="transaction-details"
                className=" p-4 ring-1 ring-sky-500/20 rounded-md"
            >
                <div className="grid grid-cols-[max-content,1fr] gap-x-8 gap-y-4">
                    <Chip title="Transaction Hash" value={transaction?.hash} />

                    <Chip
                        title="Status"
                        value={
                            <TransactionStatus
                                status={
                                    transaction &&
                                    transactionReceipt?.status === 1
                                        ? "confirmed"
                                        : "failed"
                                }
                            />
                        }
                    />
                    <Chip
                        title="Block"
                        value={transaction?.blockNumber}
                        description={`${
                            transaction?.confirmations ?? 0
                        } Block Confirmations`}
                    />
                    {block && (
                        <Chip
                            title="Timestamp"
                            value={`${moment(block.timestamp * 1000)
                                .startOf("hour")
                                .fromNow()} (${moment(
                                block.timestamp * 1000
                            ).format("MMMM Do YYYY, h:mm:ss a")})`}
                        />
                    )}
                    <Divider className="col-span-2" />

                    <Chip title="From" value={transaction?.from ?? "0x"} />
                    <Chip title="To" value={transaction?.to ?? "0x"} />
                    <Chip
                        title="Value"
                        value={`${Utils.formatUnits(
                            BigNumber.from(transaction?.value ?? 0),
                            "gwei"
                        )} Gwei`}
                        description={`(${Utils.formatEther(
                            BigNumber.from(transaction?.value ?? 0)
                        )} ETH)`}
                    />
                </div>
            </article>
        </section>
    );
};

export default Transaction;
