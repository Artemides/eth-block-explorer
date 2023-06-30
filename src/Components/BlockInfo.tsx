import { BigNumber, Block, BlockWithTransactions, Utils } from "alchemy-sdk";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { BlockStatus } from "./BlockStatus";
import { BsBox } from "react-icons/bs";
import moment from "moment";
import { AlchemyContext } from "@/Context/AlchemyProvider";
import { ALCHEMY_RPC_URL } from "@/utils/constants/config";
import axios from "axios";
import { Chip } from "./Chip";
import { Divider } from "./Divider";
import { useRouter } from "next/navigation";
type BlockInfo = {
    block: Block;
};
type BlockMetadata = Block & {
    totalDifficulty: string;
    stateRoot: string;
    withdrawalsRoot: string;
    size: string;
    withdrawals: any[];
};

export const BlockInfo = ({ block }: BlockInfo) => {
    const { getBlockReward } = useContext(AlchemyContext) as AlchemyContext;
    const [blockReward, setBlockReward] = useState<string>("0");
    const [blockMetaData, setBlockMetaData] = useState<BlockMetadata | null>(
        null
    );
    const router = useRouter();

    const blockDate = useMemo(() => {
        const date = moment(block.timestamp * 1000).format(
            "MMMM Do YYYY, h:mm:ss a"
        );
        return date;
    }, [block.timestamp]);

    useEffect(() => {
        const getBlockMetadata = async () => {
            const response = await axios.post(ALCHEMY_RPC_URL, {
                jsonrpc: "2.0",
                id: "0",
                method: "eth_getBlockByNumber",
                params: [Utils.hexValue(block.number), true],
            });
            const metaData = response.data.result as BlockMetadata;
            console.log({ metaData });
            setBlockMetaData(metaData);
        };
        getBlockMetadata();
    }, [block.number]);

    useEffect(() => {
        const calcBlockReward = async () => {
            const blockReward = await getBlockReward(block);
            const blockRewardEth = Utils.formatEther(blockReward);
            setBlockReward(blockRewardEth);
        };
        calcBlockReward();
    }, [block, getBlockReward]);

    const parseBigNumber = (number: BigNumber | undefined | null) =>
        BigNumber.from(number) ?? BigNumber.from(0);

    const remainingGas = useMemo(() => {
        const gasLimit = block.gasLimit;
        const gasUsed = block.gasUsed;
        const remainingGas = gasUsed.mul(100).div(gasLimit);
        return BigInt(BigNumber.from(remainingGas).toString()).toLocaleString(
            "en-US"
        );
    }, [block.gasLimit, block.gasUsed]);

    const onViewTransactions = () => {
        router.push(`/transactions/${block.hash}`);
    };

    return (
        <div className="w-full bg-black/30 p-4 rounded-xl  ring-1 ring-sky-800/30   ">
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
                <div className="grid grid-cols-[max-content,1fr] gap-x-8 gap-y-4 mt-4">
                    <Chip
                        title={"Transactions"}
                        value={block.transactions.length}
                        description={"transactions"}
                        highlight
                        onClick={onViewTransactions}
                    />
                    <Chip
                        title={"Withdrawals"}
                        value={blockMetaData?.withdrawals.length ?? 0}
                        description={"withdrawals"}
                        highlight
                    />
                    <Divider className="col-span-2" />
                    <Chip title={"Miner"} value={block.miner} highlight />
                    <Chip
                        title={"Block Reward"}
                        value={blockReward}
                        description="ETH"
                    />

                    {blockMetaData && (
                        <>
                            <Chip
                                title={"Total Dificulty"}
                                value={BigInt(
                                    BigNumber.from(
                                        blockMetaData.totalDifficulty
                                    ).toString()
                                ).toLocaleString("en-US")}
                                description="ETH"
                            />
                            <Chip
                                title={"Size"}
                                value={parseInt(
                                    blockMetaData.size
                                ).toLocaleString("en-US")}
                                description="bytes"
                            />
                        </>
                    )}
                    <Divider className="col-span-2" />

                    <Chip
                        title={"Gas Used"}
                        value={BigInt(
                            BigNumber.from(block.gasUsed).toString()
                        ).toLocaleString("en-Us")}
                        description={`(${remainingGas} %)`}
                    />
                    <Chip
                        title={"Gas Limit"}
                        value={BigInt(
                            BigNumber.from(block.gasLimit).toString()
                        ).toLocaleString("en-Us")}
                    />
                    <Chip
                        title={"BaseFeePerGas"}
                        value={`${Utils.formatEther(
                            block.baseFeePerGas ?? BigNumber.from(0)
                        )} ETH`}
                        description={`(
                        ${Utils.formatUnits(
                            (block.baseFeePerGas ?? "").toString(),
                            "gwei"
                        )} Gwei)`}
                    />
                    <Chip
                        title={"Burnt Fees"}
                        value={Utils.formatEther(
                            parseBigNumber(block.baseFeePerGas).mul(
                                block.gasUsed
                            )
                        )}
                        description={"ETH"}
                    />
                    <Chip title={"Extra Data"} value={block.extraData} />
                    <Divider className="col-span-2" />
                    <Chip title="Hash" value={block.hash} />
                    <Chip
                        title="Parent Hash"
                        value={block.parentHash}
                        highlight
                    />
                    <Chip
                        title="State Root"
                        value={blockMetaData?.stateRoot ?? ""}
                    />
                    <Chip
                        title="Withdrawals Root"
                        value={blockMetaData?.withdrawalsRoot ?? ""}
                    />
                </div>
            </div>
        </div>
    );
};
