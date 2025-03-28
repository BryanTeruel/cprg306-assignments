"use client";

export default function Item(props) {
  return (
    <div
      className="p-3 rounded-lg w-full bg-sky-900 hover:bg-sky-800 cursor-pointer transition-colors duration-200"
      onClick={props.onSelect}
    >
      <li className="text-xl font-bold">{props.name}</li>
      <h2>
        Buy {props.quantity} in {props.category}
      </h2>
    </div>
  );
}
