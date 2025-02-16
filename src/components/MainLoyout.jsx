import React from "react";
import SaitBar from "./SaitBar";
import { Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function MainLoyout() {
  const { theme } = useTheme();
  return (
    <div
      className={` flex gap-[355px] min-h-screen ${
        theme === "dark" ? "bg-white" : "bg-[#0C0E16]"
      }`}
    >
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
