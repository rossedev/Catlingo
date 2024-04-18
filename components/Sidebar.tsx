import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./SidebarItem";
import itemsSidebar from "@/data/itemsSidebar.json";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { LoaderSpin } from "./LoaderSpin";

type TSidebarProps = {
  className?: string;
};

export const Sidebar = ({ className }: TSidebarProps) => {
  return (
    <div
      className={cn(
        "flex lg:fixed h-full lg:w-64 left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href="/learn">
        <div className="flex pt-8 pl-4 pb-7 items-center gap-x-3">
          <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />
          <h1 className="text-2xl font-extrabold text-green-500 tracking-wide">
            Duo
          </h1>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-y-2">
        {itemsSidebar.map((item, index) => (
          <SidebarItem
            key={index}
            href={item.href}
            label={item.label}
            iconSrc={item.iconSrc}
          />
        ))}
      </div>
      <div className="p-4">
        <ClerkLoading>
          <LoaderSpin/>
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};
