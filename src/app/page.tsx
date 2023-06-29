import { AlchemyProvider } from "../Context/AlchemyProvider";
import { Dashboard } from "../Components/Dashboard";
import { Navbar } from "@/Components/Navbar";

export default function Home() {
    return (
        <main className=" flex min-h-screen flex-col  ">
            <Dashboard />
        </main>
    );
}
