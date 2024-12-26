import Footer from "../../shared/components/Footer"
import Header from "../../shared/components/Header"
import Sidebar from "../components/Sidebar"

function ManagerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-grow flex">
                <Sidebar />
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default ManagerLayout
