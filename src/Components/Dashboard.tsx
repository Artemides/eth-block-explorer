"use client";

import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { AlchemyContext } from "../Context/AlchemyProvider";
import { BlockStats } from "@/utils/types/blocksTypes";
import { Block as BlockItem } from "./Block";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { Block, BlockWithTransactions, Utils } from "alchemy-sdk";
import { BlockInfo } from "./BlockInfo";
import axios from "axios";
import { Modal } from "./Modal";

const BLOCKS_OFFSET = 10;
export const Dashboard = () => {
    const { alchemy, getBlockReward } = useContext(
        AlchemyContext
    ) as AlchemyContext;

    const [latestBlock, setLatestBlock] = useState<number>(0);
    const [latestBlocks, setlatestBlocks] = useState<BlockStats[]>([]);
    const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

    useEffect(() => {
        const getLatestBlocks = async () => {
            const latestBlocks: BlockStats[] = new Array(BLOCKS_OFFSET)
                .fill(latestBlock)
                .map((blockNumber, index) => {
                    return { number: blockNumber - index, reward: "0" };
                });
            latestBlocks.sort((a, b) => a.number - b.number);
            setlatestBlocks(latestBlocks);
        };
        getLatestBlocks();
    }, [alchemy, getBlockReward, latestBlock]);

    useEffect(() => {
        if (!latestBlock) return;
        const latestBlocks = new Array(BLOCKS_OFFSET)
            .fill(latestBlock)
            .map((blockNumber, index) => blockNumber - index);
    }, [alchemy.core, getBlockReward, latestBlock]);

    const onSelectBlock = useCallback(
        async (blockNumber: number) => {
            const thisBlock = await alchemy.core.getBlock(blockNumber);

            const transactions = await alchemy.core.getTransactionReceipts({
                blockHash: thisBlock.hash,
            });
            const contractTransactions = (transactions.receipts ?? []).reduce(
                (contracts, transaction) =>
                    transaction.to && transaction.logs.length > 0
                        ? contracts + 1
                        : contracts,
                0
            );
            setSelectedBlock(thisBlock);
        },
        [alchemy.core]
    );

    useEffect(() => {
        const alchemySocket = alchemy.ws.on("block", (blockNumber) => {
            setLatestBlock(blockNumber);
        });
        return () => {
            alchemySocket.off("block");
        };
    }, [alchemy.ws]);

    return (
        <>
            <div className="grid grid-cols-[500px,1fr] gap-2 p-4">
                <aside className=" bg-black/30 p-4 rounded-xl  ring-1 ring-sky-800/30">
                    <h3 className="font-bold text-2xl self-center text-center">
                        Latests Blocks
                    </h3>
                    <div className=" flex gap-4 items-center ">
                        <div className="flex  flex-1  flex-wrap items-center justify-center md:justify-start gap-4 px-4 py-2 max-w-full overflow-x-auto">
                            {latestBlocks.reverse().map((block) => (
                                <BlockItem
                                    block={block}
                                    key={block.number}
                                    onSelectBlock={onSelectBlock}
                                />
                            ))}
                            <button
                                className="
                                text-xs py-[2px] px-2 bg-amber-500/50 ring-2 ring-amber-500 rounded-full
                                cursor-pointer transition-colors duration-300 ease-out
                                hover:bg-amber-500
                                "
                            >
                                {" "}
                                All blocks
                            </button>
                        </div>
                    </div>
                </aside>
                <div className="flex flex-col gap-4  flex-1">
                    <section id="block-info">
                        {selectedBlock && <BlockInfo block={selectedBlock} />}
                    </section>
                </div>
            </div>
        </>
    );
};
