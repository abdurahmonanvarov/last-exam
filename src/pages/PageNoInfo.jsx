import React from "react";
import Navbar from "../components/Navbar";
import NoteInfo from "/public/notinfo.png";
import { useTheme } from "../context/ThemeContext";

function PageNoInfo() {
  const { theme } = useTheme();
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-[141px] px-4">
        {/* Rasm joylashgan joy */}
        <div className="mb-6">
          <img
            src={NoteInfo} // Rasmingizning to‘g‘ri yo‘lini kiriting
            alt="Empty state illustration"
            className="w-64 h-auto"
          />
        </div>

        {/* Matn qismi */}
        <h2
          className={`text-xl font-bold ${
            theme == "dark" ? "text-gray-800" : "text-white"
          }`}
        >
          There is nothing here
        </h2>
        <p
          className={` ${
            theme == "dark" ? "text-gray-800" : "text-white"
          } text-center max-w-md mt-2`}
        >
          Create an invoice by clicking the{" "}
          <span
            className={`font-semibold  ${
              theme == "dark" ? "text-gray-800" : "text-white"
            }`}
          >
            New Invoice
          </span>{" "}
          button and get started.
        </p>
      </div>
    </div>
  );
}

export default PageNoInfo;
