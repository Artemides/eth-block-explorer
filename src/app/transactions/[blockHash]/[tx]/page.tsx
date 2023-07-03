"use client";

import { Chip } from "@/Components/Chip";
import TransactionStatus from "@/Components/TransactionStatus";
import { AlchemyContext } from "@/Context/AlchemyProvider";
import { TransactionReceipt } from "alchemy-sdk";
import React, { useContext, useEffect, useState } from "react";

const Transaction = ({ params }: { params: { tx: string } }) => {
    const { alchemy } = useContext(AlchemyContext) as AlchemyContext;
    const { tx } = params;
    const [transaction, setTransaction] = useState<TransactionReceipt | null>();

    useEffect(() => {
        if (!tx) return;
        const retrieveTransaction = async () => {
            const response = await alchemy.core.getTransactionReceipt(tx);
            console.log({ response });
            setTransaction(response);
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
                    <Chip
                        title="Transaction Hash"
                        value={transaction?.transactionHash}
                    />

                    <Chip
                        title="Status"
                        value={
                            <TransactionStatus
                                status={
                                    transaction && transaction.status === 1
                                        ? "confirmed"
                                        : "failed"
                                }
                            />
                        }
                    />
                </div>
            </article>
        </section>
    );
};

export default Transaction;
