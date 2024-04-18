"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

type TSidebarItemProps = {
  label: string;
  iconSrc?: string;
  href: string;
};
export const SidebarItem = ({ label, iconSrc, href }: TSidebarItemProps) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      variant={active ? "sidebarOutline" : "sidebar"}
      className="justify-start h-[52px]"
      asChild
    >
      <Link href={href}>
        <Image
          src={iconSrc ? iconSrc : "./default.svg"}
          alt={label}
          className="mr-5"
          width={26}
          height={26}
        />
        {label}
      </Link>
    </Button>
  );
};
