import { BlockStats } from "@/utils/types/blocksTypes"
import React from "react"
import { BsBox } from "react-icons/bs"
export const Block = ({ block }: { block: BlockStats }) => {
    return (
        <div className="flex flex-col justify-evenly gap-[1px] items-center py-2 px-4 bg-black/20 rounded-md">
            <BsBox size={36} />
            <span className="text-sm text-indigo-300 font-bold">
                {block.number}
            </span>
        </div>
    )
}
