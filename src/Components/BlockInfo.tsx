import { Block } from "alchemy-sdk";
import React, { useMemo } from "react";
import { BlockStatus } from "./BlockStatus";
import { BsBox } from "react-icons/bs";
import moment from "moment";

type BlockInfo = {
    block: Block;
};

export const BlockInfo = ({ block }: BlockInfo) => {
    const blockDate = useMemo(() => {
        const date = moment(block.timestamp * 1000).format("LLLL");
        return date;
    }, []);
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
        </div>
    );
};
