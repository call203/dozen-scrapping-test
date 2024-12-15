"use client";

import { logout } from "@/lib/api/authApi";
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
      <div className="max-w-screen flex flex-wrap items-center mx-auto p-4 justify-between">
        <div>
          <Link href="/scrap">
            <span className="sm:mx-3 self-center text-2xl font-semibold whitespace-nowrap text-blue">
              Dozn
            </span>
          </Link>
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
        <div className="text-dark_gray hidden sm:block mx-3" onClick={logout}>
          logout
        </div>
      </div>
    </div>
  );
};

export default Navigation;
