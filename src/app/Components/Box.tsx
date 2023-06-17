"use client";

import React, { useContext, useEffect, useState } from "react";
import { AlchemyContext } from "./AlchemyProvider";

export const Box = () => {
  const { alchemy } = useContext(AlchemyContext);
  const [blockNumber, setBlockNumber] = useState(0);
  useEffect(() => {
    if (!alchemy) return;
    const getLatestBlock = async () => {
      console.log({ alchemy });
      const block = await alchemy.core.getBlockNumber();
      console.log({ block });
      setBlockNumber(block);
    };
    getLatestBlock();
  }, [alchemy]);
  return <div>Latest Block: {blockNumber}</div>;
};
