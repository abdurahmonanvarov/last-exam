import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";

const DeletModal = ({ isOpen, handleCloseModal, id }) => {
  const { theme } = useTheme();
  const nav = useNavigate();
  // Handle deletion
  const handleDelete = async () => {
    try {
      // Send DELETE request
      const response = await axios.delete(`http://localhost:3000/treap/${id}`);
      console.log("Product deleted:", response.data);
      nav("/");
      toast.success("Your info delet succesfully");
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting the product:", error);
    }
  };
  const dark = theme == "dark";

  return (
    <div>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className={`inline-block align-bottom ${
                dark ? "  bg-white" : "bg-black"
              } rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}
            >
              <div
                className={`${
                  dark ? "  bg-white" : " bg-[#1E2139]"
                } px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}
              >
                <h3
                  className={`text-lg leading-6 font-medium ${
                    dark ? " text-gray-900" : "text-white"
                  }`}
                >
                  Confirm Deletion
                </h3>
                <div className="mt-2">
                  <p
                    className={`text-sm leading-5 ${
                      dark ? "  text-gray-500" : "text-white"
                    }`}
                  >
                    Are you sure you want to delete invoice #{id}? This action
                    cannot be undone.
                  </p>
                </div>
              </div>
              <div
                className={`${
                  dark ? "  bg-white" : " bg-[#1E2139]"
                } px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse`}
              >
                <button
                  onClick={handleDelete} // Call handleDelete to send the delete request
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto"
                >
                  Delete
                </button>
                <button
                  onClick={handleCloseModal} // Use the passed function to close modal
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeletModal;
