"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { AlchemyContext } from "../Context/AlchemyProvider";
import { BigNumber, Block, Utils } from "alchemy-sdk";

export const Dashboard =  () => {
  const { alchemy } = useContext(AlchemyContext);
  const [blockNumber, setBlockNumber] = useState(0);

  const getTransactionGasUsed=useCallback(async(transactionHash:string)=>{
    console.log("getTransactionGasUsed")
    const transactionReceipt=await alchemy?.core.getTransactionReceipt(transactionHash);
    const gasUsed=transactionReceipt?.gasUsed ?? 0;
    return gasUsed;
  },[alchemy?.core])

  const getBlockReward=useCallback(async (block:Block)=>{
    console.log("getBlockReward")
    const blockBaseFeePerGas=block.baseFeePerGas ?? BigNumber.from(0);
    const blockGasUsed=block.gasUsed;
    const blockTransactions=block.transactions;
    const minerTips=[];
    console.log({blockTransactions:blockTransactions.length})
    for(const transaction of blockTransactions ){
        const tx=await alchemy?.core.getTransaction(transaction);
        const gasPrice=tx?.gasPrice ?? 0;
        const gasUsed=await getTransactionGasUsed(transaction);
        const transactionFee=Utils.formatEther(BigNumber.from(gasUsed).mul(gasPrice));
        minerTips.push(transactionFee)
    } 
    const TransactionsFee=minerTips.reduce((totalFee,fee)=>totalFee.add(fee),BigNumber.from(0))
    const burnedFee=Utils.formatEther(blockBaseFeePerGas.mul(blockGasUsed));
    
    const baseBlockReward=BigNumber.from(2);

    const blockReward= baseBlockReward.add(TransactionsFee).sub(burnedFee);
    console.log({blockReward})
    return blockReward.toString();
  },[alchemy?.core, getTransactionGasUsed])

  useEffect(() => {
    if (!alchemy) return;
    const getLatestBlock = async () => {
      const block = await alchemy.core.getBlockNumber();
      console.log({block})
      const blockData=await alchemy.core.getBlock(block);
      console.log({blockData})
      const blockReward=await getBlockReward(blockData);
      console.log({blockReward})
      setBlockNumber(block);
  
    };
    getLatestBlock();
  }, [alchemy,getBlockReward]);



  return <div>Latest Block: {blockNumber}</div>;
};
