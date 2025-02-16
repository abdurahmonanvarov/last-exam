import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";

function EditInvoice({ isOpenEdit, handleCloseModalEdit, id }) {
  const [invoice, setInvoice] = useState(null);
  const [formData, setFormData] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/treap/${id}`)
        .then((response) => {
          setInvoice(response.data);
          setFormData(response.data);
        })
        .catch((error) => console.error("Error fetching invoice:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    updatedItems[index].total =
      updatedItems[index].quantity * updatedItems[index].price;
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const handleDeleteItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
      total: (prev.total = 0),
    }));
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:3000/treap/${id}`, formData)
      .then(() => {
        toast.success("Invoice updated successfully!");
        handleCloseModalEdit(false);
        window.location.reload();
      })
      .catch((error) => console.error("Error updating invoice:", error));
  };

  const dark = theme == "dark";

  return (
    <div>
      {isOpenEdit && formData && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-start left-[109px] items-center z-50">
          <div
            className={`max-w-3xl w-[616px] shadow-lg rounded-tr-[20px] rounded-br-[20px] p-[56px] relative overflow-y-auto h-[740px] ${
              dark ? "  bg-white text-black" : "bg-[#141625] text-white"
            }`}
          >
            <h2 className="text-[24px] font-bold mb-[24px] text-[#7E88C3]">
              Edit{" "}
              <span className={dark ? "text-black" : "text-white "}>
                {invoice.id}
              </span>
            </h2>

            <section className="mb-6">
              <h2 className="text-[12px] font-semibold text-[#7E88C3] mb-2">
                Bill From
              </h2>
              <label className="block text-sm font-semibold">
                Street Address
              </label>
              <input
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                className={`block border p-2 w-full rounded mt-1 ${
                  dark
                    ? "   bg-gray-100"
                    : "bg-[#1E2139] text-white border-gray-600"
                }`}
              />
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div>
                  <label className="block text-sm font-semibold">City</label>
                  <input
                    name="city"
                    value={formData.senderAddress.city}
                    onChange={handleChange}
                    className={`block border p-2 w-full rounded mt-1 ${
                      dark
                        ? "   bg-gray-100"
                        : "bg-[#1E2139] text-white border-gray-600"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold">
                    Post Code
                  </label>
                  <input
                    name="postCode"
                    value={formData.senderAddress.postCode}
                    onChange={handleChange}
                    className={`block border p-2 w-full rounded mt-1 ${
                      dark
                        ? "   bg-gray-100"
                        : "bg-[#1E2139] text-white border-gray-600"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold">Country</label>
                  <input
                    name="country"
                    value={formData.senderAddress.country}
                    onChange={handleChange}
                    className={`block border p-2 w-full rounded mt-1 ${
                      dark
                        ? "   bg-gray-100"
                        : "bg-[#1E2139] text-white border-gray-600"
                    }`}
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[12px] font-semibold text-[#7E88C3] mb-2">
                Bill To
              </h2>
              <label className="block text-sm font-semibold">
                Client's Name
              </label>
              <input
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                className={`block border p-2 w-full rounded mt-1 ${
                  dark
                    ? "   bg-gray-100"
                    : "bg-[#1E2139] text-white border-gray-600"
                }`}
              />
              <label className="block text-sm font-semibold mt-2">
                Client's Email
              </label>
              <input
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleChange}
                className={`block border p-2 w-full rounded mt-1 ${
                  dark
                    ? "   bg-gray-100"
                    : "bg-[#1E2139] text-white border-gray-600"
                }`}
              />

              <label className="block text-sm font-semibold mt-2">
                Street Address
              </label>
              <input
                name="street"
                value={formData.clientAddress.street}
                onChange={handleChange}
                className={`block border p-2 w-full rounded mt-1 ${
                  dark
                    ? "   bg-gray-100"
                    : "bg-[#1E2139] text-white border-gray-600"
                }`}
              />
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div>
                  <label className="block text-sm font-semibold">City</label>
                  <input
                    name="city"
                    value={formData.clientAddress.city}
                    onChange={handleChange}
                    className={`block border p-2 w-full rounded mt-1 ${
                      dark
                        ? "   bg-gray-100"
                        : "bg-[#1E2139] text-white border-gray-600"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold">
                    Post Code
                  </label>
                  <input
                    name="postCode"
                    value={formData.clientAddress.postCode}
                    onChange={handleChange}
                    className={`block border p-2 w-full rounded mt-1 ${
                      dark
                        ? "   bg-gray-100"
                        : "bg-[#1E2139] text-white border-gray-600"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold">Country</label>
                  <input
                    name="country"
                    value={formData.clientAddress.country}
                    onChange={handleChange}
                    className={`block border p-2 w-full rounded mt-1 ${
                      dark
                        ? "   bg-gray-100"
                        : "bg-[#1E2139] text-white border-gray-600"
                    }`}
                  />
                </div>
              </div>
            </section>

            {/* Invoice Date & Payment Terms */}
            <div className="flex justify-between mt-[20px]">
              <div>
                <label className="block text-sm font-semibold">
                  Invoice Date
                </label>
                <input
                  name="createdAt"
                  value={formData.createdAt}
                  onChange={handleChange}
                  className={`block border p-2 w-full rounded mt-1 ${
                    dark
                      ? "   bg-gray-100"
                      : "bg-[#1E2139] text-white border-gray-600"
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold">
                  Payment Terms
                </label>
                <input
                  name="paymentDue"
                  value={formData.paymentDue}
                  onChange={handleChange}
                  className={`block border p-2 w-full rounded mt-1 ${
                    dark
                      ? "   bg-gray-100"
                      : "bg-[#1E2139] text-white border-gray-600"
                  }`}
                />
              </div>
            </div>

            {/* Project Description */}
            <div className="mt-[20px]">
              <label className="block text-sm font-semibold">
                Project Description
              </label>
              <input
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`block border p-2 w-full rounded mt-1 ${
                  dark
                    ? "   bg-gray-100"
                    : "bg-[#1E2139] text-white border-gray-600"
                }`}
              />
            </div>

            {/* Item List */}
            <h3 className="text-xl font-semibold mt-6 text-[#7E88C3]">
              Item List
            </h3>
            <div className="grid grid-cols-5 gap-4 items-center p-2 rounded mb-2">
              <label className="text-sm font-semibold">Item Name</label>
              <label className="text-sm font-semibold">Qty.</label>
              <label className="text-sm font-semibold">Price</label>
              <label className="text-sm font-semibold">Total</label>
            </div>
            {[...(formData?.items || []), ...(formData?.setItems || [])].map(
              (item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 gap-4 items-center  p-2 rounded mb-2"
                >
                  <span
                    className={`border p-2 rounded ${
                      dark ? "bg-gray-100" : "bg-[#1E2139] text-white"
                    }`}
                  >
                    {item.name}
                  </span>
                  <span
                    className={`border p-2 rounded ${
                      dark ? "bg-gray-100" : "bg-[#1E2139] text-white"
                    }`}
                  >
                    {item.quantity}
                  </span>
                  <span
                    className={`border p-2 rounded ${
                      dark ? "bg-gray-100" : "bg-[#1E2139] text-white"
                    }`}
                  >
                    {item.price}
                  </span>
                  <span
                    className={`border p-2 rounded ${
                      dark ? "bg-gray-100" : "bg-[#1E2139] text-white"
                    }`}
                  >
                    {formData.total}
                  </span>
                  <MdDeleteOutline
                    onClick={() => handleDeleteItem(index)}
                    className="w-[30px] h-[30px] flex cursor-pointer pr-[-20px]"
                  />
                </div>
              )
            )}

            <div className="flex justify-between gap-4 mt-6">
              <button
                onClick={handleCloseModalEdit}
                className={`border p-2 rounded ${
                  dark ? "   text-[#0C0E16]" : "text-white "
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditInvoice;
