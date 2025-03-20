"use client";

import { Trash } from "lucide-react";

export default function Item(props) {
  const handleClick = (e) => {
    // Prevent the click from bubbling up to the parent div
    e.stopPropagation();
    props.onSelect();
  };

  const handleDelete = (e) => {
    // Prevent the click from bubbling up to the parent div
    e.stopPropagation();
    props.onDelete();
  };
  return (
    <div
      className="p-3 rounded-lg w-full bg-sky-900 hover:bg-sky-800 cursor-pointer transition-colors duration-200 flex justify-between items-center"
      onClick={handleClick}
    >
      <div>
        <li className="text-xl font-bold">{props.name}</li>
        <h2>
          Buy {props.quantity} in {props.category}
        </h2>
      </div>
      <button
        onClick={handleDelete}
        className="p-2 rounded-full hover:bg-red-600 transition-colors"
        aria-label="Delete item"
      >
        <Trash className="w-5 h-5" />
      </button>
    </div>
  );
}
