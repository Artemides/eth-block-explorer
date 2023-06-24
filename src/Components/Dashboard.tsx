"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { AlchemyContext } from "../Context/AlchemyProvider";
import { Utils } from "alchemy-sdk";
import { BlockStats } from "@/utils/types/blocksTypes";
import { Block } from "./Block";

export const Dashboard = () => {
    const { alchemy, getBlockReward } = useContext(
        AlchemyContext
    ) as AlchemyContext;
    const [latestBlock, setLatestBlock] = useState<number>(0);
    const [latestBlocks, setlatestBlocks] = useState<BlockStats[]>([]);
    const [blockOffset, setBlockOffset] = useState<number>(2);

    useEffect(() => {
        const getLatestBlock = async () => {
            const blockNumber = await alchemy.core.getBlockNumber();

            setLatestBlock(blockNumber);
        };
        getLatestBlock();
    }, [alchemy, getBlockReward]);

    useEffect(() => {
        if (!latestBlock) return;
        const latestBlocks = new Array(blockOffset)
            .fill(latestBlock)
            .map((blockNumber, index) => blockNumber - index);

        const blockStats: BlockStats[] = [];

        const getStats = async () => {
            await Promise.all(
                latestBlocks.map(async (blockNumber) => {
                    const block = await alchemy.core.getBlock(blockNumber);
                    const blockReward = await getBlockReward(block);
                    const blockRewardEther =
                        Utils.formatEther(blockReward).toString();
                    blockStats.push({
                        number: blockNumber,
                        reward: blockRewardEther,
                    });
                })
            );
            setlatestBlocks(blockStats);
        };
        getStats();
    }, [alchemy.core, blockOffset, getBlockReward, latestBlock]);

    return (
        <div className="flex gap-4 p-4">
            <aside className="h-[700px] w-[500px] bg-black/30"></aside>
            <div className="flex flex-col gap-4  flex-1">
                <h3 className="font-bold text-2xl self-center">Blocks</h3>
                <div className=" flex ">
                    {latestBlocks.reverse().map((block) => (
                        <Block block={block} key={block.number} />
                    ))}
                </div>
            </div>
        </div>
    );
};
