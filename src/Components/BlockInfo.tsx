import { BigNumber, Block, BlockWithTransactions, Utils } from "alchemy-sdk";
import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { BlockStatus } from "./BlockStatus";
import { BsBox } from "react-icons/bs";
import moment from "moment";
import { AlchemyContext } from "@/Context/AlchemyProvider";
import { ALCHEMY_RPC_URL } from "@/utils/constants/config";
import axios from "axios";
import { metadata } from "@/app/layout";
import { Chip } from "./Chip";
import { Divider } from "./Divider";

type BlockInfo = {
    block: Block;
};
type BlockMetadata = Block & {
    totalDifficulty: string;
    size: string;
    withdrawals: any[];
};

export const BlockInfo = ({ block }: BlockInfo) => {
    const { getBlockReward } = useContext(AlchemyContext) as AlchemyContext;
    const [blockReward, setBlockReward] = useState<string>("0");
    const [blockMetaData, setBlockMetaData] = useState<BlockMetadata | null>(
        null
    );
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
                <div className="grid grid-cols-[max-content,1fr] gap-x-8 gap-y-4">
                    <Chip
                        title={"Transactions"}
                        value={block.transactions.length}
                        description={"transactions"}
                        highlight
                    />
                    <Chip
                        title={"Withdrawals"}
                        value={blockMetaData?.withdrawals.length ?? 0}
                        description={"withdrawals"}
                        highlight
                    />
                </div>
                <Divider />
                <div className="grid grid-cols-[max-content,1fr] gap-x-8 gap-y-4">
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
                </div>
            </div>
        </div>
    );
};
