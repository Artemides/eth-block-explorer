"use client";

import { AlchemyContext } from "@/Context/AlchemyProvider";
import { AssetTransfersCategory, OwnedNftsResponse, Utils } from "alchemy-sdk";
import React, { useContext, useEffect, useState } from "react";
import { SiEthereum } from "react-icons/si";
import { BiUserCircle } from "react-icons/bi";

type AddressProps = {
    address: string;
};

const Address = ({ params }: { params: AddressProps }) => {
    const { address } = params;
    const [balance, setBalance] = useState<string>("");
    const [nfts, setNfts] = useState<OwnedNftsResponse>();
    const { alchemy } = useContext(AlchemyContext) as AlchemyContext;
    useEffect(() => {
        const retrieveBalance = async () => {
            const addressBalance = await alchemy.core.getBalance(address);
            setBalance(Utils.formatEther(addressBalance));

            const gg = await alchemy.core.getAssetTransfers({
                fromAddress: address,
                fromBlock: "0x0",
                category: [
                    AssetTransfersCategory.EXTERNAL,
                    AssetTransfersCategory.INTERNAL,
                    AssetTransfersCategory.ERC1155,
                    AssetTransfersCategory.ERC20,
                    AssetTransfersCategory.ERC721,
                ],
            });
        };
        const retrieveNfts = async () => {
            const nftResponse = await alchemy.nft.getNftsForOwner(address);
            setNfts(nftResponse);
        };

        retrieveBalance();
        retrieveNfts();
    }, [address, alchemy.core, alchemy.nft]);

    return (
        <section className="p-8">
            <div className="mb-4 flex items-center gap-2">
                <BiUserCircle size={28} />
                <h2 className="text-xl font-semibold">Address: </h2>
                <p className="text-md text-sky-500">{address}</p>
            </div>
            <div className="flex ">
                <div className=" bg-black/30 p-4 rounded-xl  ring-1 ring-sky-800/30 min-w-[300px] ">
                    <h3>Overview</h3>
                    <div className="my-4">
                        <p className="text-sm text-gray-300">ETH Balance:</p>
                        <p>
                            <SiEthereum
                                size={16}
                                className="inline-block mr-2 align-middle"
                            />
                            {balance} ETH
                        </p>
                    </div>
                    <div className="my-4">
                        <p className="text-sm text-gray-300">Owned NFTs:</p>
                        <p>{nfts?.totalCount} nfts</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Address;
