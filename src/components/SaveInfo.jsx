import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Import the UUID function
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";

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
  });
  const { theme } = useTheme();

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

  const dark = theme === "dark";

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-start left-[109px] items-center z-50">
      <div
        className={`max-w-3xl shadow-lg rounded-tr-[20px] w-[616px] rounded-br-[20px] p-[56px] relative overflow-y-auto h-[740px] ${
          dark ? "  bg-white text-[#0C0E16]" : "bg-[#141625] text-white"
        }`}
      >
        <h2
          className={`text-[24px] font-bold mb-[48px] ${
            dark ? "text-[#7E88C3]" : "text-white"
          }`}
        >
          New Invoice
        </h2>

        <section className="mb-6">
          <h2
            className={`text-[12px] font-semibold  ${
              dark ? "text-[#7E88C3]" : "text-white"
            }`}
          >
            Bill From
          </h2>
          <input
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            className={`w-full border p-2 rounded mt-2 ${
              dark ? "bg-white text-[#0C0E16]" : "  bg-[#252945] text-white"
            }`}
            type="text"
            placeholder="Street Address"
          />
          <div className="grid grid-cols-3 gap-4 mt-2">
            {["city", "postCode", "country"].map((field) => (
              <input
                key={field}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className={`border p-2 rounded ${
                  dark ? "bg-white text-[#0C0E16]" : "  bg-[#252945] text-white"
                }`}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              />
            ))}
          </div>
        </section>

        <section>
          <h2
            className={`text-[12px] font-semibold  ${
              dark ? "text-[#7E88C3]" : "text-white"
            }`}
          >
            Bill To
          </h2>
          {["clientName", "clientEmail", "clientStreet"].map((field) => (
            <input
              key={field}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              className={`w-full border p-2 rounded mt-2 ${
                dark ? "bg-white text-[#0C0E16]" : "  bg-[#252945] text-white"
              }`}
              type={field === "clientEmail" ? "email" : "text"}
              placeholder={field
                .replace("client", "")
                .replace(/([A-Z])/g, " $1")}
            />
          ))}
          <div className="grid grid-cols-3 gap-4 mt-2">
            {["clientCity", "clientPostCode", "clientCountry"].map((field) => (
              <input
                key={field}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className={`border p-2 rounded ${
                  dark ? "bg-white text-[#0C0E16]" : "  bg-[#252945] text-white"
                }`}
                type="text"
                placeholder={field
                  .replace("client", "")
                  .replace(/([A-Z])/g, " $1")}
              />
            ))}
          </div>
        </section>

        {/* Date Inputs */}
        <div className="flex justify-between mt-[20px]">
          {["createdAt", "paymentDue"].map((field) => (
            <div key={field} className="mb-[10px]">
              <label className="block text-[12px] font-medium text-[#7E88C3] mb-[10px]">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="date"
                className={`w-full border p-2 rounded ${
                  dark ? "bg-white text-[#0C0E16]" : "  bg-[#252945] text-white"
                }`}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </div>

        {/* Item List */}
        <h3 className="text-xl font-semibold mt-6 text-[#7E88C3]">Item List</h3>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {["name", "qty", "price"].map((field) => (
            <input
              key={field}
              className={`border p-2 rounded mb-[10px] ${
                dark ? "bg-white text-[#0C0E16]" : "  bg-[#252945] text-white"
              }`}
              name={field}
              value={newItem[field]}
              onChange={handleItemChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              type={field === "name" ? "text" : "number"}
            />
          ))}
        </div>

        {items.length > 0 && (
          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-4 gap-4 items-center border p-2 rounded mb-2 ${
                  dark ? "bg-white text-[#0C0E16] " : " bg-[#252945] text-white"
                }`}
              >
                <span>${item.qty * item.price}</span>
              </div>
            ))}
          </div>
        )}

        <div
          className={`p-2 rounded mb-[10px] ${
            dark ? "bg-white text-[#0C0E16]" : "  bg-[#252945] text-white"
          }`}
        >
          Total: ${calculateTotalAmount()}
        </div>

        <button onClick={addItem} className="btn btn-primary block">
          Add Item
        </button>

        {/* Action buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className={`border p-2 rounded ${
              dark ? "text-[#0C0E16] bg-white" : "  text-white bg-[#252945]"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={() => handleSave("draft")}
            className={`p-2 rounded ${
              dark ? "bg-blue-500 text-white " : " bg-[#7C5DFA] text-white"
            }`}
          >
            Save as Draft
          </button>
          <button
            onClick={() => handleSave("pending")}
            className={`p-2 rounded ${
              dark ? "bg-green-500 text-white" : "  bg-[#33D69F] text-white"
            }`}
          >
            Save & Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default SaveInfo;
