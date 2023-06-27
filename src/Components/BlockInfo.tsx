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
                <div className="grid grid-cols-[max-content,1fr] gap-4">
                    <span>Transactions: </span>
                    <span className="font-semibold text-sky-400">
                        {block.transactions.length} transactions
                    </span>
                    <span>Withdrawals: </span>
                    <span className="font-semibold text-sky-400">
                        {blockMetaData?.withdrawals.length ?? 0} withdrawals
                    </span>
                    <span>Miner: </span>
                    <span className="font-semibold text-sky-400 break-all">
                        {block.miner}
                    </span>
                    <span>Block Reward: </span>
                    <span className="font-semibold text-sky-400 break-all">
                        {blockReward} ETH
                    </span>
                    {blockMetaData && (
                        <>
                            <span>Total Dificulty: </span>
                            <span>
                                {BigInt(
                                    BigNumber.from(
                                        blockMetaData.totalDifficulty
                                    ).toString()
                                ).toLocaleString("en-US")}
                            </span>
                            <span>Size: </span>
                            <span>
                                {parseInt(blockMetaData.size).toLocaleString(
                                    "en-US"
                                )}{" "}
                                bytes
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
