"use client";

import Link from "next/link";
import { FC } from "react";

interface NavigationProps {
  handleNavigaion: (view: string) => void;
  currentNav: string;
}
/** 네비게이션  */
const Navigation: FC<NavigationProps> = ({ handleNavigaion, currentNav }) => {
  return (
    <div className="bg-white">
      <div className="max-w-screen flex flex-wrap items-center mx-auto p-4">
        <Link href="/scrap">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue">
            Dozn
          </span>
        </Link>
        <div className="md:ml-6 ml-3 text-dark_gray font-semibold text-sm md:text-base">
          <button
            className={`mx-3 md:mx-5 ${
              currentNav === "apiList" && "text-blue"
            }`}
            onClick={() => handleNavigaion("apiList")}
          >
            API 조회
          </button>
          <button
            className={`mx-3 md:mx-5 ${
              currentNav === "apiHistory" && "text-blue"
            }`}
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
