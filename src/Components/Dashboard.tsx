"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { AlchemyContext } from "../Context/AlchemyProvider";
import { BigNumber, Block, BlockWithTransactions, Utils } from "alchemy-sdk";

export const Dashboard =  () => {
  const { alchemy } = useContext(AlchemyContext);
  const [blockNumber, setBlockNumber] = useState(0);

  const getBlockReward=useCallback(async (block:Block)=>{
    console.log("getBlockReward")
    const blockBaseFeePerGas=block.baseFeePerGas ?? BigNumber.from(0);
    const blockGasUsed=block.gasUsed;
    const BlockWithTransactions =await alchemy?.core.getBlockWithTransactions(block.number);
    const transactions=BlockWithTransactions?.transactions;
    const transactionsReceipts=await alchemy?.core.getTransactionReceipts({blockHash:block.hash});
    // const blockTransactions=block.transactions;
    const minerTips=[];

    if(transactionsReceipts && transactionsReceipts.receipts&&transactions){
      for(const transaction of transactions ){
        console.log({transaction:transaction.hash})
        const gasPrice=transaction.gasPrice ?? BigNumber.from(0);
        const transactionReceipt=transactionsReceipts.receipts.find(tx=>tx.transactionHash===transaction.hash);
        if(!transactionReceipt) continue ;

        const gasUsed=transactionReceipt.gasUsed;
        const transactionFee=BigNumber.from(gasUsed).mul(gasPrice);
        console.log({transactionFee})
        
        minerTips.push(transactionFee)
    } 
    }

   
    const TransactionsFee=minerTips.reduce((totalFee,fee)=>totalFee.add(fee),BigNumber.from(0))
    const burnedFee=blockBaseFeePerGas.mul(blockGasUsed);
    
    const baseBlockReward=BigNumber.from(2);
    const blockReward= baseBlockReward.add(TransactionsFee).sub(burnedFee);
    console.log({blockReward})
    return blockReward;
  },[alchemy?.core])

  useEffect(() => {
    if (!alchemy) return;
    const getLatestBlock = async () => {
      const block = await alchemy.core.getBlockNumber();
      console.log({block})
      const blockData=await alchemy.core.getBlock(block);
      console.log({blockData})
      const blockReward=(await getBlockReward(blockData));
      console.log({blockReward:Utils.formatEther(blockReward).toString()})
      setBlockNumber(block);
  
    };
    getLatestBlock();
  }, [alchemy,getBlockReward]);



  return <div>Latest Block: {blockNumber}</div>;
};
