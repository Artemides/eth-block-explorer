"use client";
import {
    Alchemy,
    AlchemySettings,
    BigNumber,
    Block,
    Network,
    TransactionReceipt,
} from "alchemy-sdk";
import { PropsWithChildren, createContext, useCallback, useState } from "react";

export type AlchemyContext = {
    alchemy: Alchemy;
    getBlockReward: (block: Block) => Promise<BigNumber>;
};

export const AlchemyContext = createContext<AlchemyContext | null>(null);
const settings: AlchemySettings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
export const AlchemyProvider = ({ children }: PropsWithChildren) => {
    const alchemy = new Alchemy(settings);
    const findTransactionsReceipt = (
        receipts: TransactionReceipt[],
        transactionHash: string
    ) => {
        const transactionReceipt = receipts.find(
            (tx) => tx.transactionHash === transactionHash
        );
        return transactionReceipt;
    };
    const getTransactionsFee = useCallback(
        async (blockHash: string): Promise<BigNumber> => {
            let transactionsFee = BigNumber.from(0);
            const transactionsReceipts =
                await alchemy.core.getTransactionReceipts({ blockHash });
            const BlockWithTransactions =
                await alchemy.core.getBlockWithTransactions(blockHash);
            if (!transactionsReceipts || !BlockWithTransactions)
                return transactionsFee;

            const transactions = BlockWithTransactions.transactions;
            const receipts = transactionsReceipts.receipts;
            if (!receipts) return transactionsFee;

            for (const transaction of transactions) {
                const gasPrice = transaction.gasPrice ?? BigNumber.from(0);
                const transactionReceipt = findTransactionsReceipt(
                    receipts,
                    transaction.hash
                );
                if (!transactionReceipt) continue;

                const gasUsed = transactionReceipt.gasUsed;
                const transactionFee = BigNumber.from(gasUsed).mul(gasPrice);
                transactionsFee = transactionsFee.add(transactionFee);
            }
            return transactionsFee;
        },
        [alchemy.core]
    );

    const getBlockReward = useCallback(
        async (block: Block) => {
            const blockBaseFeePerGas = block.baseFeePerGas ?? BigNumber.from(0);
            const blockGasUsed = block.gasUsed;
            const transactionsFee = await getTransactionsFee(block.hash);

            const burntFee = blockBaseFeePerGas.mul(blockGasUsed);
            const baseBlockReward = BigNumber.from(2);
            const blockReward = baseBlockReward
                .add(transactionsFee)
                .sub(burntFee);
            return blockReward;
        },
        [getTransactionsFee]
    );

    return (
        <AlchemyContext.Provider value={{ alchemy, getBlockReward }}>
            {children}
        </AlchemyContext.Provider>
    );
};
