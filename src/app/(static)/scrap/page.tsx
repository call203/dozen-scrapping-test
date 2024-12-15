"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import ApiList from "./APiList";
import ApiHistory from "./ApiHistory";

export default function Page() {
  const [currentNav, setCurrentNav] = useState("apiList");

  const handleNavigaion = (view: string) => {
    setCurrentNav(view);
  };

  return (
    <>
      <Navigation handleNavigaion={handleNavigaion} currentNav={currentNav} />
      <div className="flex flex-col min-h-[100vh] w-full md:p-10 p-4">
        {currentNav === "apiList" ? <ApiList /> : <ApiHistory />}
      </div>
    </>
  );
}
