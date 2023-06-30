import { TransactionResponse, Utils } from "alchemy-sdk";
import React from "react";
import { BsArrowRightCircle } from "react-icons/bs";
const tableHeaders = ["Txn Hash", "Method", "From", "", "To", "Value"];

type TableProps = {
    transactions: TransactionResponse[];
};

const fancyString = (str: string) => {
    return `${str.slice(0, 8)}...${str.slice(-8)}`;
};

const Table = ({ transactions }: TableProps) => {
    return (
        <table className=" overflow-y-auto">
            <thead className="">
                <tr className="[&>th]:py-2 [&>th>span]:font-bold bg-sky-500/10 ">
                    {tableHeaders.map((head) => (
                        <th key={head}>
                            <span>{head}</span>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className=" text-[14px]">
                {transactions.map((tx) => (
                    <tr
                        key={tx.hash}
                        className="[&>td]:p-4 [&>td>p]:text-center border-b-[1px] border-b-sky-500/30 last:border-b-0 "
                    >
                        <td>
                            <p className="font-semibold text-sky-500">{`${tx.hash.slice(
                                0,
                                16
                            )}...`}</p>
                        </td>
                        <td>
                            <p className="py-[2px] rounded-full bg-gray-500/40 ring-1 ring-gray-500 text-xs">
                                unkown
                            </p>
                        </td>

                        <td>
                            <p className="font-semibold text-sky-500">
                                {fancyString(tx.from)}
                            </p>
                        </td>
                        <td>
                            <p className="font-semibold text-green-400">
                                <BsArrowRightCircle size={21} />
                            </p>
                        </td>
                        <td>
                            <p className="font-semibold text-sky-500">
                                {fancyString(tx.to ?? "")}
                            </p>
                        </td>
                        <td>
                            <p>{`${Utils.formatEther(tx.value)}  ETH`}</p>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
