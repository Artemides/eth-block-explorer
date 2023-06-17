"use client";
import { Alchemy, AlchemySettings, Network } from "alchemy-sdk";
import { PropsWithChildren, createContext, useState } from "react";

type AlchemyContext = {
  alchemy?: Alchemy;
};

export const AlchemyContext = createContext<AlchemyContext>({});
const settings: AlchemySettings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
export const AlchemyProvider = ({ children }: PropsWithChildren) => {
  const alchemy = new Alchemy(settings);

  return (
    <AlchemyContext.Provider value={{ alchemy }}>
      {children}
    </AlchemyContext.Provider>
  );
};
