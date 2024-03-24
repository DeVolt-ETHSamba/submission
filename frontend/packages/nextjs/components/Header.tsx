"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BugAntIcon } from "@heroicons/react/24/outline";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Debug Contracts",
    href: "/debug",
    icon: <BugAntIcon className="h-4 w-4" />,
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${
                isActive ? "bg-secondary shadow-md" : ""
              } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  return (
    <div className="sticky top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-[2000]">
      <div className="navbar-start w-auto">
        <Link href="/" passHref className="flex items-center gap-2 ml-4 mr-6">
          <div className="flex relative w-[8rem] h-[4rem]">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
        </Link>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <div className="flex mx-8">
          <Link href="/" passHref className="flex items-center gap-2 ml-4 mr-6">
            <header className="ml-4 mr-4 hover:text-primary duration-100">Home</header>
          </Link>
          <Link href="/sell-power" passHref className="flex items-center gap-2 ml-4 mr-6">
            <header className="ml-4 mr-4 hover:text-primary duration-100">Sell</header>
          </Link>
          <Link href="/buy-power" passHref className="flex items-center gap-2 ml-4 mr-6">
            <header className="ml-4 mr-4 hover:text-primary duration-100">Buy</header>
          </Link>
        </div>
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  );
};
