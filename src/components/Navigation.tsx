"use client";

import Link from "next/link";
import { FC } from "react";

interface NavigationProps {
  handleNavigaion: (view: string) => void;
  currentNav: string;
}
const Navigation: FC<NavigationProps> = ({ handleNavigaion, currentNav }) => {
  return (
    <div className="bg-white">
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
        <Link href="/scrap">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue">
            Dozn
          </span>
        </Link>
        <div className="ml-6 text-dark_gray font-semibold text-sm md:text-base">
          <button
            className={`mx-5 ${currentNav === "apiList" && "text-blue"}`}
            onClick={() => handleNavigaion("apiList")}
          >
            API 조회
          </button>
          <button
            className={`mx-5 ${currentNav === "apiHistory" && "text-blue"}`}
            onClick={() => handleNavigaion("apiHistory")}
          >
            조회 히스토리
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
