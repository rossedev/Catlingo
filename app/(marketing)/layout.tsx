import { ReactNode } from "react"
import { Header } from "./Header";
import { Footer } from "./Footer";

type Props = {
    children: ReactNode
}

const MarketingLayout = ({children}:Props) => {
    return (
      <div className="flex flex-col min-h-screen">
        <Header/>
        <main className="flex flex-col flex-1 items-center justify-center">
            {children}
        </main>
        <Footer/>
      </div>
    );
}

export default MarketingLayout