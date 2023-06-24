import { AlchemyProvider } from "../Context/AlchemyProvider"
import { Dashboard } from "../Components/Dashboard"
import { Navbar } from "@/Components/Navbar"

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col  bg-gradient-radial from-indigo-950 from-10%  to-black ">
            <AlchemyProvider>
                <Navbar />
                <Dashboard />
            </AlchemyProvider>
        </main>
    )
}
