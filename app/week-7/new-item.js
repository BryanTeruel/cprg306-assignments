"use client";
import { useState } from "react";

export default function NewItem({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("Produce");

  const handleIncrement = () => {
    if (quantity < 20) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      quantity,
      category,
    };

    onAddItem(newItem);

    setName("");
    setQuantity(1);
    setCategory("Produce");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="w-full max-w-md bg-gray-300 p-6 rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-2xl text-gray-900 font-semibold text-center mb-6">
        New Item
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700 font-medium">Item Name:</span>
          <input
            name="nameInput"
            required
            onChange={handleNameChange}
            value={name}
            className="mt-1 p-2 w-full rounded-md border border-gray-300 text-black bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </label>
        <div className="flex gap-4">
          <div className="flex-1">
            <span className="text-gray-700 font-medium">Quantity:</span>
            <div className="flex items-center bg-gray-50 p-2 rounded-md border border-gray-300 mt-1 justify-between">
              <span className="text-black w-12 text-center">{quantity}</span>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={quantity === 1}
                  className="px-3 text-base bg-sky-600 hover:bg-sky-500 active:bg-sky-700 disabled:bg-gray-300 text-white rounded-md transition"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={quantity === 20}
                  className="px-3 text-base bg-sky-600 hover:bg-sky-500 active:bg-sky-700 disabled:bg-gray-300 text-white rounded-md transition"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <span className="text-gray-700 font-medium">Category:</span>
            <select
              name="categoryInput"
              required
              onChange={handleCategoryChange}
              value={category}
              className="mt-1 p-3 w-full rounded-md border border-gray-300 text-black bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="produce">Produce</option>
              <option value="dairy">Dairy</option>
              <option value="bakery">Bakery</option>
              <option value="meat">Meat</option>
              <option value="frozen Foods">Frozen Foods</option>
              <option value="canned Goods">Canned Goods</option>
              <option value="dry goods">Dry Goods</option>
              <option value="beverages">Beverages</option>
              <option value="snacks">Snacks</option>
              <option value="household">Household</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-semibold rounded-md transition"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
