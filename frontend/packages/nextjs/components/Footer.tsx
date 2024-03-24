import React from "react";
import Link from "next/link";
import { hardhat } from "viem/chains";
import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { BuidlGuidlLogo } from "~~/components/assets/BuidlGuidlLogo";
import { Faucet } from "~~/components/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useGlobalState } from "~~/services/store/store";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <footer className="bg-[#161616] text-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <p>&copy; {new Date().getFullYear()} DeVolt Energy. All rights reserved.</p>
          </div>
          <div>
            <a href="https://twitter.com/devoltenergy" className="mr-4 hover:text-gray-300">
              Twitter
            </a>
            <a href="https://facebook.com/devoltenergy" className="mr-4 hover:text-gray-300">
              Facebook
            </a>
            <a href="https://linkedin.com/company/devoltenergy" className="hover:text-gray-300">
              LinkedIn
            </a>
          </div>
        </div> 
      </div>
    </footer>
  );
};
