"use client";
import { useState } from "react";

export function NewItem() {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="bg-white w-auto flex items-center rounded">
      <text className="text-black px-2 m-2 w-10 text-right">{quantity}</text>
      <button
        onClick={decrement}
        disabled={quantity === 1}
        className="px-2 py-1 m-2 bg-sky-600 active:bg-sky-800 disabled:bg-gray-400 rounded text-white text-sm"
      >
        -
      </button>
      <button
        onClick={increment}
        disabled={quantity === 20}
        className="px-2 py-1 m-2 bg-sky-600 active:bg-sky-800 disabled:bg-gray-400 rounded text-white text-sm"
      >
        +
      </button>
    </div>
  );
}
