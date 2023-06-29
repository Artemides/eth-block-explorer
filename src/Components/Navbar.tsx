"use client";

import { AlchemyContext, AlchemyProvider } from "@/Context/AlchemyProvider";
import React, { useContext, useEffect, useState } from "react";
import { MdInsights } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
export const Navbar = () => {
    const { alchemy } = useContext(AlchemyContext) as AlchemyContext;
    const [networkName, setNetworkName] = useState<string>("");

    useEffect(() => {
        const getNetwork = () => {
            const network = alchemy.config.network;
            const [name] = network.split("-").reverse();
            setNetworkName(name);
        };
        getNetwork();
    }, [alchemy.config.network]);

    return (
        <nav className="sticky  top-0 flex justify-center items-center gap-2 w-full py-4 px-16 bg-black/25 backdrop-blur-sm border-b-sky-500/20 border-b-[1px] ">
            <div className="absolute flex gap-2 left-16">
                <MdInsights size={24} />
                <span className=" font-semibold text-xl ">EtherInsights</span>
            </div>
            <span className="flex items-center gap-[1px] font-semibold capitalize  py-[4px] px-2 text-xs text-indigo-400  rounded-full ring-2 ring-indigo-900 bg-indigo-900/40 shadow-md">
                <FaEthereum size={16} />
                {networkName}
            </span>
        </nav>
    );
};
