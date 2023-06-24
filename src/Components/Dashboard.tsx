"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { AlchemyContext } from "../Context/AlchemyProvider";
import { BlockStats } from "@/utils/types/blocksTypes";
import { Block } from "./Block";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

export const Dashboard = () => {
    const { alchemy, getBlockReward } = useContext(
        AlchemyContext
    ) as AlchemyContext;
    const [latestBlock, setLatestBlock] = useState<number>(0);
    const [latestBlocks, setlatestBlocks] = useState<BlockStats[]>([]);
    const [blockOffset, setBlockOffset] = useState<number>(10);

    useEffect(() => {
        const getLatestBlocks = async () => {
            const blockNumber = await alchemy.core.getBlockNumber();
            setLatestBlock(blockNumber);
            const latestBlocks: BlockStats[] = new Array(blockOffset)
                .fill(blockNumber)
                .map((blockNumber, index) => {
                    return { number: blockNumber - index, reward: "0" };
                });
            latestBlocks.sort((a, b) => a.number - b.number);
            setlatestBlocks(latestBlocks);
        };
        getLatestBlocks();
    }, [alchemy, blockOffset, getBlockReward]);

    useEffect(() => {
        if (!latestBlock) return;
        const latestBlocks = new Array(blockOffset)
            .fill(latestBlock)
            .map((blockNumber, index) => blockNumber - index);

        // const getStats = async () => {
        //     await Promise.all(
        //         latestBlocks.map(async (blockNumber) => {
        //             const block = await alchemy.core.getBlock(blockNumber);
        //             const blockReward = await getBlockReward(block);
        //             const blockRewardEther =
        //                 Utils.formatEther(blockReward).toString();
        //             blockStats.push({
        //                 number: blockNumber,
        //                 reward: blockRewardEther,
        //             });
        //         })
        //     );
        //     blockStats.sort((a, b) => b.number - a.number);
        //     setlatestBlocks(blockStats);
        // };
        // getStats();
    }, [alchemy.core, blockOffset, getBlockReward, latestBlock]);

    return (
        <div className="grid grid-cols-[500px,1fr] gap-2 p-4">
            <aside className="h-[700px]  bg-black/30"></aside>
            <div className="flex flex-col gap-4  flex-1">
                <h3 className="font-bold text-2xl self-center">Blocks</h3>

                <div className=" flex gap-4 items-center ">
                    <div className="flex  flex-1  flex-wrap items-center justify-center md:justify-start gap-4 p-2 max-w-full overflow-x-auto">
                        {latestBlocks.reverse().map((block) => (
                            <Block block={block} key={block.number} />
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
            </div>
        </div>
    );
};
