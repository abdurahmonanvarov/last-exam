import React from "react";
import IconsHeader from "/public/icon.png";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";

function SaitBar() {
  const { theme } = useTheme();
  return (
    <div
      className={`flex min-h-screen 0 ${
        theme ? "bg-[#141625]" : "bg-gray-100"
      }`}
    >
      {" "}
      <aside
        className={`w-[103px] bg-gray-900  flex flex-col items-center py-6 rounded-tr-[20px] text-white rounded-br-[20px]`}
      >
        <div className="bg-primary p-3 w-[103px] h-[103px] top-0 absolute rounded-tr-[20px]">
          <span className="absolute left-[32px] top-[33.29px] cursor-pointer">
            <img
              src={IconsHeader}
              className="rounded-full w-[40px] h-[37px]"
              alt="User"
            />
          </span>
        </div>
        <div className="flex flex-col  mt-[530px]">
          {/* darc light uchun */}
          <ThemeToggle />
          <div className="mt-auto mb-4 border-t border-[#494E6E] w-[103px]">
            <img
              src="https://picsum.photos/200/300"
              className="rounded-full w-[40px] h-[40px] mt-[24px] absolute left-[31px]  cursor-pointer"
              alt="User"
            />
          </div>
        </div>
      </aside>
    </div>
  );
}

export default SaitBar;
