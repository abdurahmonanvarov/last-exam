import React from "react";
import SaitBar from "./SaitBar";
import { Outlet } from "react-router-dom";

function MainLoyout() {
  return (
    <div className="flex gap-[355px] min-h-screen bg-gray-100">
      <div className="">
        <SaitBar />
      </div>

      <main className="">
        <Outlet /> {/* Shu joyga ichki sahifalar yuklanadi */}
      </main>
    </div>
  );
}

export default MainLoyout;
