import { Block, BlockWithTransactions, Utils } from "alchemy-sdk";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { BlockStatus } from "./BlockStatus";
import { BsBox } from "react-icons/bs";
import moment from "moment";
import { AlchemyContext } from "@/Context/AlchemyProvider";

type BlockInfo = {
    block: Block;
};

export const BlockInfo = ({ block }: BlockInfo) => {
    const { getBlockReward } = useContext(AlchemyContext) as AlchemyContext;
    const [blockReward, setBlockReward] = useState<string>("0");
    const blockDate = useMemo(() => {
        const date = moment(block.timestamp * 1000).format(
            "MMMM Do YYYY, h:mm:ss a"
        );
        return date;
    }, [block.timestamp]);

    useEffect(() => {
        const calcBlockReward = async () => {
            const blockReward = await getBlockReward(block);
            const blockRewardEth = Utils.formatEther(blockReward);
            setBlockReward(blockRewardEth);
        };
        calcBlockReward();
    }, [block, getBlockReward]);
    return (
        <div className="w-full bg-black/30 p-4 rounded-xl">
            <div
                id="block-info-header"
                className="flex justify-between gap-2 items-center"
            >
                <div>
                    <BsBox size={16} className="inline-block mr-2" />
                    <span className="font-semibold">{block.number}</span>
                </div>
                <BlockStatus status="Finalized" />
                <span>{blockDate}</span>
            </div>
            <div>
                <div className="grid grid-cols-[max-content,1fr] gap-4">
                    <span>transactions: </span>
                    <span className="font-semibold text-sky-400">
                        {block.transactions.length} transactions
                    </span>
                    <span>Miner: </span>
                    <span className="font-semibold text-sky-400 break-all">
                        {block.miner}
                    </span>
                    <span>Block Reward: </span>
                    <span className="font-semibold text-sky-400 break-all">
                        {blockReward} ETH
                    </span>
                </div>
            </div>
        </div>
    );
};
