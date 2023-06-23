"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { AlchemyContext } from "../Context/AlchemyProvider";
import { BigNumber, Block, BlockWithTransactions, TransactionReceipt, TransactionResponse, Utils } from "alchemy-sdk";

type BlockStats={
  number:number,
  reward:string
}
export const Dashboard =  () => {
  const { alchemy,getBlockReward } = useContext(AlchemyContext) as AlchemyContext;
  const [latestBlock, setLatestBlock] = useState<BlockStats>({number:0,reward:'0'});
  useEffect(() => {
    const getLatestBlock = async () => {
      const blockNumber = await alchemy.core.getBlockNumber();
      const block=await alchemy.core.getBlock(blockNumber);
      const blockReward=await getBlockReward(block);
      const blockRewardEther=Utils.formatEther(blockReward).toString();
      setLatestBlock({number:blockNumber,reward:blockRewardEther});
  
    };
    getLatestBlock();
  }, [alchemy,getBlockReward]);



  return <div className="flex gap-4 p-4 ring-2 ring-sky-500 rounded-md shadow-lg bg-sky-800/60">
      <div>Latest Block: {latestBlock.number}</div>
      <div>Block Reward: {latestBlock.reward}</div>
  </div>;
};
