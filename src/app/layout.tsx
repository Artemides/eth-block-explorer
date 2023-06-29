import { Navbar } from "@/Components/Navbar";
import "./globals.css";
import { Roboto } from "next/font/google";
import { AlchemyProvider } from "@/Context/AlchemyProvider";

const inter = Roboto({
    subsets: ["latin"],
    weight: ["400", "100", "300", "500", "700"],
});

export const metadata = {
    title: "Ethereum Block Explorer",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={
                    inter.className +
                    " bg-gradient-radial from-indigo-950 from-10%  to-black overflow-x-hidden"
                }
            >
                <AlchemyProvider>
                    <Navbar />
                    {children}
                </AlchemyProvider>
            </body>
        </html>
    );
}
