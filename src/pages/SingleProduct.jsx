import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeletModal from "../components/DeletModal";
import axios from "axios";

function SingleProduct() {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/treap/${id}`);
        setProductData(response.data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 bg-gray-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>{" "}
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <DeletModal isOpen={isOpen} handleCloseModal={handleCloseModal} id={id} />
      <div className="mt-[64px] mb-[24px] w-[730px] h-[135px]">
        <Link
          to="/"
          className="text-blue-600 flex items-center mb-[32px] text-[12px] gap-[23px]"
        >
          &larr; Go back
        </Link>

        {/* Status & Buttons */}
        <div className="flex justify-between items-center bg-white p-4 rounded-[8px] pr-[32px] pl-[32px] pt-[20px] pb-[20px]">
          <span className="text-gray-700 font-medium flex items-center gap-[16px]">
            <span className="text-[12px] text-[#858BB2]"> Status</span>
            <span
              className={`flex gap-[8px] items-center w-[120px] rounded-[6px] h-[40px] pl-[18px] pr-[18px] ${
                productData?.status === "paid"
                  ? "bg-lime-100 text-[#33D69F]"
                  : " bg-orange-100 text-[#FF8F00]"
              }`}
            >
              <span
                className={`w-2 h-2 ${
                  productData?.status === "paid"
                    ? "bg-[#33D69F]"
                    : "bg-[#FF8F00]"
                } rounded-full`}
              ></span>
              {productData?.status || "Padding"}
            </span>
          </span>
          <div className="flex items-center gap-[8px]">
            <button className="bg-gray-300 text-[#7E88C3] py-[16px] px-[23px] rounded-[25px] hover:bg-gray-400 transition">
              Edit
            </button>
            <button
              onClick={handleOpenModal}
              className="bg-red text-white py-[16px] px-[23px] rounded-[25px] hover:bg-red-600 transition"
            >
              Delete
            </button>
            <button className="bg-purple-600 text-white py-[16px] px-[23px] rounded-[25px] hover:bg-purple-700 transition">
              Mark as Paid
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl shadow-lg p-[48px] w-full max-w-[730px] overflow-y-auto h-[460px] bg-white">
        {/* Invoice Details */}
        <div className="flex justify-between mb-[21px]">
          <div>
            <h2 className="text-[16px] font-bold">#{productData?.id}</h2>
            <p className="text-[#7E88C3] text-[12px]">
              {productData?.category || "Graphic Design"}
            </p>
          </div>
          <div className="flex flex-col gap-[]">
            <span className="text-[#7E88C3] text-[11px]">
              {productData.senderAddress.street}
            </span>
            <span className="text-[#7E88C3] text-end text-[11px]">
              {productData.senderAddress.city}
            </span>
            <span className="text-[#7E88C3] text-end text-[11px]">
              {productData.senderAddress.postCode}
            </span>
            <span className="text-[#7E88C3] text-[11px]">
              {productData.senderAddress.country}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-[100px] mb-[45px]">
          <div>
            <p className="text-[#7E88C3] text-[12px]">Invoice Date</p>
            <p className="font-bold text-[#0C0E16] text-[15px]">
              {productData?.createdAt}
            </p>
            <p className="text-[#7E88C3] mt-[20px] text-[12px]">Payment Due</p>
            <p className="font-bold text-[#0C0E16] text-[15px]">
              {productData?.paymentDue}
            </p>
          </div>
          <div>
            <p className="text-[#7E88C3] text-[12px]">Bill To</p>
            <p className="font-bold text-[#0C0E16] text-[15px] mb-[12px] mt-[12px]">
              {productData.clientName}
            </p>
            <p className="text-[#7E88C3] text-[12px]">
              <span>{productData.senderAddress.street}</span>
              <span>{productData.senderAddress.city}</span>
              <span>{productData.senderAddress.postCode}</span>
              <span>{productData.senderAddress.country}</span>
            </p>
          </div>
          <div>
            <p className="text-[#7E88C3] text-[12px]">Sent to</p>
            <p className="font-bold text-[#0C0E16] text-[15px]">
              {productData?.clientEmail}
            </p>
          </div>
        </div>
        {/* Invoice Items */}
        <div className="bg-gray-50 p-4 rounded-lg mt-6">
          <div className="flex justify-between py-2 font-bold border-b pb-2">
            <span className="w-1/4 text-[11px]">Item Name</span>
            <span className="w-1/4 text-center text-[11px]">QTY.</span>
            <span className="w-1/4 text-center text-[11px]">Price</span>
            <span className="w-1/4 text-right text-[11px]">Total</span>
          </div>

          {[
            ...(productData?.items || []),
            ...(productData?.setItems || []),
          ].map((item, index) => (
            <div className="flex justify-between py-2 border-b" key={index}>
              <span className="w-1/4 text-[#0C0E16] font-bold">
                {item.name}
              </span>
              <span className="w-1/4 text-center font-bold">
                {item.quantity}
              </span>
              <span className="w-1/4 text-center font-bold">{item.price}$</span>
              <span className="w-1/4 text-right text-[#0C0E16] font-bold">
                {item.total}$
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="bg-gray-900 text-white p-4 mt-4 rounded-lg text-lg flex justify-between font-semibold">
          <span>Amount Due</span>
          <span>{productData?.total}$</span>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
