import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Import the UUID function
import { toast } from "react-toastify";

function SaveInfo({ onClose }) {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    streetAddress: "",
    city: "",
    postCode: " ",
    country: " ",
    clientName: " ",
    clientEmail: "",
    clientStreet: "  ",
    clientCity: "",
    clientPostCode: " ",
    clientCountry: " ",
    createdAt: "",
    paymentDue: "",
    clientPhone: "", // New field
    clientCompany: "", // New field
  });

  const [newItem, setNewItem] = useState({ name: "", qty: 1, price: 0 });

  const addItem = () => {
    if (newItem.name && newItem.qty && newItem.price) {
      setItems([...items, newItem]);
      setNewItem({ name: "", qty: 1, price: 0 });
    } else {
      toast.error("All item fields are required!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const calculateTotalAmount = () => {
    return items.reduce((acc, item) => acc + item.qty * item.price, 0);
  };

  const validateForm = () => {
    const fields = [
      "city",
      "postCode",
      "country",
      "clientName",
      "clientEmail",
      "clientStreet",
      "clientCity",
      "clientPostCode",
      "clientCountry",
      "createdAt",
      "paymentDue",
    ];

    for (let field of fields) {
      if (!formData[field]) {
        toast.error(`Please fill the ${field}`);
        return false;
      }
    }

    if (items.length === 0) {
      toast.error("Please add at least one item.");
      return false;
    }

    return true;
  };

  const handleSave = async (status) => {
    if (!validateForm()) return;

    const invoiceId = uuidv4();

    const invoiceData = {
      id: invoiceId,
      createdAt: formData.createdAt,
      paymentDue: formData.paymentDue,
      description: "Re-branding",
      paymentTerms: 1,
      clientName: formData.clientName || "",
      clientEmail: formData.clientEmail || "",
      status: status,
      senderAddress: {
        street: formData.streetAddress || "",
        city: formData.city || "",
        postCode: formData.postCode || "",
        country: formData.country || "",
      },
      clientAddress: {
        street: formData.clientStreet || "",
        city: formData.clientCity || "",
        postCode: formData.clientPostCode || "",
        country: formData.clientCountry || "",
      },
      items: items.map((item) => ({
        name: item.name || "",
        quantity: item.qty || 1,
        price: item.price || 0,
        total: item.qty * item.price || 0,
      })),
      total: calculateTotalAmount(),
    };

    try {
      await axios.post("http://localhost:3000/treap", invoiceData);
      toast.success("Success: Invoice saved!");
      onClose();
    } catch (error) {
      console.error("Error saving invoice:", error);
      alert("Error: Could not save the invoice.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-start left-[109px] items-center z-50">
      <div className="max-w-3xl bg-white shadow-lg rounded-tr-[20px] w-[616px] rounded-br-[20px] p-[56px] relative overflow-y-auto h-[740px]">
        <h2 className="text-[24px] font-bold mb-[48px] text-[#7E88C3]">
          New Invoice
        </h2>

        <section className="mb-6">
          <h2 className="text-[12px] font-semibold text-[#7E88C3]">
            Bill From
          </h2>

          <input
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            className="w-full  bg-white border p-2 rounded mt-2"
            type="text"
            placeholder="Street Address"
          />
          <div className="grid grid-cols-3 gap-4 mt-2">
            <input
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="border  bg-white p-2 rounded"
              type="text"
              placeholder="City"
            />
            <input
              name="postCode"
              value={formData.postCode}
              onChange={handleInputChange}
              className="border  bg-white p-2 rounded"
              type="text"
              placeholder="Post Code"
            />
            <input
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="border  bg-white p-2 rounded"
              type="text"
              placeholder="Country"
            />
          </div>
        </section>

        <section>
          <h2 className="text-[12px] font-semibold  text-[#7E88C3]">Bill To</h2>
          <input
            name="clientName"
            value={formData.clientName}
            onChange={handleInputChange}
            className="w-full border  bg-white p-2 rounded mt-2"
            type="text"
            placeholder="Client’s Name"
          />
          <input
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleInputChange}
            className="w-full  bg-white border p-2 rounded mt-2"
            type="email"
            placeholder="e.g. email@example.com"
          />
          <input
            name="clientStreet"
            value={formData.clientStreet}
            onChange={handleInputChange}
            className="w-full  bg-white border p-2 rounded mt-2"
            type="text"
            placeholder="Street Address"
          />
          <div className="grid grid-cols-3 gap-4 mt-2">
            <input
              name="clientCity"
              value={formData.clientCity}
              onChange={handleInputChange}
              className="border  bg-white p-2 rounded"
              type="text"
              placeholder="City"
            />
            <input
              name="clientPostCode"
              value={formData.clientPostCode}
              onChange={handleInputChange}
              className="border   bg-white p-2 rounded"
              type="text"
              placeholder="Post Code"
            />
            <input
              name="clientCountry"
              value={formData.clientCountry}
              onChange={handleInputChange}
              className="border p-2  bg-white rounded"
              type="text"
              placeholder="Country"
            />
          </div>
        </section>

        {/* Date Inputs */}
        <div className="flex justify-between mt-[20px]">
          <div className="mb-[10px]">
            <label className="block text-[12px] font-medium text-[#7E88C3] mb-[10px]">
              Created At
            </label>
            <input
              type="date"
              className="w-full border p-2 rounded bg-white text-[#0C0E16]"
              name="createdAt"
              value={formData.createdAt}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-[10px]">
            <label className="block text-[12px] font-medium text-[#7E88C3] mb-[10px]">
              Payment Due
            </label>
            <input
              type="date"
              className="w-full border p-2 rounded bg-white text-[#0C0E16]"
              name="paymentDue"
              value={formData.paymentDue}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Item List */}
        <h3 className="text-xl font-semibold mt-6 text-[#7E88C3]">Item List</h3>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <input
            className="border p-2 rounded bg-white text-[#0C0E16] mb-[10px]"
            name="name"
            value={newItem.name}
            placeholder="Item Name"
            onChange={handleItemChange}
          />
          <input
            className="border p-2 rounded bg-white text-[#0C0E16] mb-[10px]"
            type="number"
            name="qty"
            value={newItem.qty}
            onChange={handleItemChange}
          />
          <input
            className="border p-2 rounded bg-white text-[#0C0E16] mb-[10px]"
            type="number"
            name="price"
            value={newItem.price}
            onChange={handleItemChange}
          />
          {items.length > 0 && (
            <div className="space-y-2">
              {items.map((item, index) => {
                const totalAmount = item.qty * item.price;
                return (
                  <div
                    key={index}
                    className="grid grid-cols-4 gap-4 items-center border p-2 rounded mb-2"
                  >
                    <span>${totalAmount}</span>
                  </div>
                );
              })}
            </div>
          )}
          <div className="bg-white text-black p-2 rounded mb-[10px]">
            Total: ${calculateTotalAmount()}
          </div>
          <button onClick={addItem} className="btn btn-primary block">
            Add Item
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="border p-2 rounded text-[#0C0E16]"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSave("draft")}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Save as Draft
          </button>
          <button
            onClick={() => handleSave("pending")}
            className="bg-green-500 text-white p-2 rounded"
          >
            Save & Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default SaveInfo;
