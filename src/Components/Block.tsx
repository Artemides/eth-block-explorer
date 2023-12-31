import { BlockStats } from "@/utils/types/blocksTypes";
import React from "react";
import { BsBox } from "react-icons/bs";

type Block = {
    onSelectBlock: (blockNumber: number) => void;
    block: BlockStats;
};

export const Block = ({ block, onSelectBlock }: Block) => {
    return (
        <div
            className="
        flex flex-col justify-evenly gap-[1px] items-center py-2 px-4 bg-black/20 rounded-md hover:scale-[1.2] hover:cursor-pointer transition-all duration-300 ease-out
        hover:bg-sky-700/80
        "
            onClick={() => onSelectBlock(block.number)}
        >
            <BsBox size={36} />
            <span className="text-sm text-indigo-300 font-bold">
                {block.number}
            </span>
        </div>
    );
};
