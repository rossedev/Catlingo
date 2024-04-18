import { MobileHeader } from "@/components/MobileHeader";
import { Sidebar } from "@/components/Sidebar";
import { TLayoutProps } from "@/types/layoutPropsDefault";

export default function MainLayout({ children }: Readonly<TLayoutProps>) {
  return (
    <>
      <MobileHeader/>
      <Sidebar className="hidden lg:flex"/>
      <main className="lg:pl-64 h-full pt-12 lg:pt-0">
        <div className="h-full bg-red-500">{children}</div>
      </main>
    </>
  );
}
