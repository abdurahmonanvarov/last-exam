import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Import the UUID function
import { toast } from "react-toastify";

function SaveInfo({ onClose }) {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    streetAddress: "19 Union Terrace",
    city: "Bradford",
    postCode: "BD1 9PB",
    country: "United Kingdom",
    clientName: "Alex Grim",
    clientEmail: "alexgrim@mail.com",
    clientStreet: "84 Church Way",
    clientCity: "Bradford",
    clientPostCode: "BD1 9PB",
    clientCountry: "United Kingdom",
  });

  const [newItem, setNewItem] = useState({ name: "", qty: 1, price: 0 });

  const addItem = () => {
    if (newItem.name && newItem.qty && newItem.price) {
      setItems([...items, newItem]);
      setNewItem({ name: "", qty: 1, price: 0 }); // Reset new item fields after adding
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

  // Calculate the total amount of all items dynamically
  const calculateTotalAmount = () => {
    return items.reduce((acc, item) => acc + item.qty * item.price, 0);
  };

  // Validate form and items before saving
  const validateForm = () => {
    // Check if all fields are filled
    const fields = [
      "streetAddress",
      "city",
      "postCode",
      "country",
      "clientName",
      "clientEmail",
      "clientStreet",
      "clientCity",
      "clientPostCode",
      "clientCountry",
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
    if (!validateForm()) return; // Stop if validation fails

    // Generate unique ID for the invoice
    const invoiceId = uuidv4();
    const today = new Date();

    const invoiceData = {
      id: invoiceId, // Use generated ID
      createdAt: `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`,
      paymentDue: `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`,
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
      total: calculateTotalAmount(), // Calculate total dynamically
    };

    try {
      await axios.post("http://localhost:3000/treap", invoiceData);
      toast.success("Success: Invoice saved!");
      onClose(); // Close the modal after successful submission
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
        <div className="space-y-4">
          {/* Sender Address */}
          <div className="mb-[10px]">
            <label className="block text-[12px] font-medium text-[#7E88C3] mb-[10px]">
              Street Address
            </label>
            <input
              className="w-full border p-2 rounded bg-white text-[#0C0E16]"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
            />
          </div>
          {/* Additional fields for sender and client address */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-[#0C0E16]">
                City
              </label>
              <input
                className="border p-2 rounded bg-white text-[#0C0E16] mb-[10px]"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-[#0C0E16]">
                Post Code
              </label>
              <input
                className="border p-2 rounded bg-white text-[#0C0E16] mb-[10px]"
                name="postCode"
                value={formData.postCode}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-[#0C0E16]">
                Country
              </label>
              <input
                className="border p-2 rounded bg-white text-[#0C0E16] mb-[10px]"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Client Address */}
        <h3 className="text-xl font-semibold mt-6 text-[#7E88C3]">Bill To</h3>
        <div className="space-y-4">
          {/* Client information */}
          <input
            className="w-full border p-2 rounded bg-white text-[#0C0E16] mb-[10px]"
            name="clientName"
            value={formData.clientName}
            onChange={handleInputChange}
          />
          <input
            className="w-full border p-2 rounded bg-white text-[#0C0E16] mb-[10px]"
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleInputChange}
          />
          {/* Additional client input fields */}
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
                const totalAmount = item.qty * item.price; // Calculate the total here
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
            Total: ${calculateTotalAmount()} {/* Total amount of all items */}
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
// salom

export default SaveInfo;
