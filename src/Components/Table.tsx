import { TransactionResponse } from "alchemy-sdk";
import React from "react";

const tableHeaders = [
    "Txn Hash",
    "Method",
    "Block",
    "Age",
    "From",
    "To",
    "Value",
];

type TableProps = {
    transactions: TransactionResponse[];
};
const Table = ({ transactions }: TableProps) => {
    return (
        <table>
            <thead>
                <tr>
                    {tableHeaders.map((head) => (
                        <th key={head}>
                            <span>{head}</span>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {transactions.map((tx) => (
                    <tr key={tx.hash}>
                        <td>
                            <p>{tx.hash}</p>
                        </td>
                        <td>
                            <p>?</p>
                        </td>
                        <td>
                            <p>{tx.blockNumber}</p>
                        </td>
                        <td>
                            <p>{tx.timestamp}</p>
                        </td>
                        <td>
                            <p>{tx.from}</p>
                        </td>
                        <td>
                            <p>{tx.to}</p>
                        </td>
                        <td>
                            <p>{tx.value.toString()}</p>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
