import { Header } from "./Header";
import { Footer } from "./Footer";
import { TLayoutProps } from "@/types/layoutPropsDefault";

const MarketingLayout = ({ children }: TLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col flex-1 items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MarketingLayout