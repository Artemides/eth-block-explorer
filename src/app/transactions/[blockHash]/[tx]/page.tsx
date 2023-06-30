import React from "react";

const page = ({ params }: { params: { tx: string } }) => {
    return <div>Tx:{params.tx}</div>;
};

export default page;
