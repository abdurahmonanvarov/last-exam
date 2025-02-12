import React from "react";

function SingleProduct() {
  return (
    <div>
      <div className="mt-[64px] mb-[24px] w-[730px] h-[135px]">
        <button className="text-blue-600 flex items-center mb-[32px] text-[12px] gap-[23px]">
          &larr; Go back
        </button>

        {/* Status & Buttons */}
        <div className="flex justify-between items-center bg-white p-4 rounded-[8px] pr-[32px] pl-[32px] pt-[20px] pb-[20px]">
          <span className="text-gray-700 font-medium flex items-center gap-[16px]">
            <span className="text-[12px] text-[#858BB2]"> Status</span>
            <span className="flex gap-[8px] items-center bg-softRed  w-[120px] rounded-[6px] h-[40px] pl-[18px] pr-[18px]">
              {" "}
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              Padding
            </span>
          </span>
          <div className="flex items-center gap-[8px]">
            <button className="bg-gray-300 text-[#7E88C3] py-[16px] px-[23px] rounded-[25px] hover:bg-gray-400 transition">
              Edit
            </button>
            <button className="bg-red text-white py-[16px] px-[23px] rounded-[25px] hover:bg-red-600 transition">
              Delete
            </button>
            <button className="bg-purple-600 text-white py-[16px] px-[23px] rounded-[25px] hover:bg-purple-700 transition">
              Mark as Paid
            </button>
          </div>
        </div>
      </div>

      <div className=" rounded-xl shadow-lg p-[48px] w-full max-w-[730px] overflow-y-auto h-[450px] bg-white ">
        {/* Go Back */}

        {/* Invoice Details */}
        <div className="">
          <div className="flex justify-between mb-[21px]">
            <div>
              {" "}
              <h2 className="text-[16px] font-bold">#XM9141</h2>
              <p className="text-[#7E88C3] text-[12px]">Graphic Design</p>
            </div>
            <div className="flex flex-col gap-[]">
              <span className="text-[#7E88C3] text-[11px]">
                19 Union Terrace
              </span>
              <span className="text-[#7E88C3] text-end text-[11px]">
                London
              </span>
              <span className="text-[#7E88C3] text-end text-[11px]">
                E1 3EZ
              </span>
              <span className="text-[#7E88C3] text-[11px]">United Kingdom</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-[100px] mb-[45px]">
            <div>
              <p className="text-[#7E88C3] text-[12px]">Invoice Date</p>
              <p className="font-bold text-[#0C0E16] text-[15px]">
                21 Aug 2021
              </p>
              <p className="text-[#7E88C3] mt-[20px] text-[12px]">
                Payment Due
              </p>
              <p className="font-bold text-[#0C0E16] text-[15px]">
                20 Sep 2021
              </p>
            </div>
            <div>
              <p className="text-[#7E88C3] text-[12px]">Bill To</p>
              <p className="font-bold text-[#0C0E16] text-[15px] mb-[12px] mt-[12px]">
                Alex Grim
              </p>
              <p className="text-[#7E88C3] text-[12px]">
                84 Church Way <br />
                Bradford <br />
                BD1 9PB <br />
                United Kingdom
              </p>
            </div>
            <div>
              <p className="text-[#7E88C3] text-[12px]">Sent to</p>
              <p className="font-bold text-[#0C0E16] text-[15px]">
                alexgrim@mail.com
              </p>
            </div>
          </div>
        </div>

        {/* Invoice Items */}
        <div className="bg-gray-50 p-4 rounded-lg mt-6">
          <div className="flex justify-between font-semibold text-gray-600 border-b pb-2">
            <span>Item Name</span>
            <span>QTY.</span>
            <span>Price</span>
            <span>Total</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-semibold">Banner Design</span>
            <span>1</span>
            <span>£156.00</span>
            <span>£156.00</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-semibold">Email Design</span>
            <span>2</span>
            <span>£200.00</span>
            <span>£400.00</span>
          </div>
        </div>

        {/* Total */}
        <div className="bg-gray-900 text-white p-4 mt-4 rounded-lg text-lg flex justify-between font-semibold">
          <span>Amount Due</span>
          <span>£556.00</span>
        </div>
      </div>
    </div>
  );
}
export default SingleProduct;
