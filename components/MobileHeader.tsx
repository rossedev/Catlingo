import { MobileSidebar } from "./MobileSidebar";

export const MobileHeader = () => {
  return (
    <nav className="flex lg:hidden fixed items-center px-6 h-12 bg-green-500 border-b top-0 w-full z-50">
      <MobileSidebar />
    </nav>
  );
};
