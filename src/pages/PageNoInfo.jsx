import React from "react";
import Navbar from "../components/Navbar";
import NoteInfo from "/public/notinfo.png";

function PageNoInfo() {
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
        <h2 className="text-xl font-bold text-gray-800">
          There is nothing here
        </h2>
        <p className="text-gray-500 text-center max-w-md mt-2">
          Create an invoice by clicking the{" "}
          <span className="font-semibold text-gray-700">New Invoice</span>{" "}
          button and get started.
        </p>
      </div>
    </div>
  );
}

export default PageNoInfo;
