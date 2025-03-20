"use client";
import { useState } from "react";
import Item from "./item";

export default function ItemList({ items, onItemSelect }) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
  });

  const groupedItems = items.reduce((category, item) => {
    if (!category[item.category]) {
      category[item.category] = [];
    }
    category[item.category].push(item);

    category[item.category] = [...category[item.category]].sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    return category;
  }, {});

  return (
    <div className="flex flex-col items-start space-y-4 p-3">
      <div className="space-x-4">
        <button
          onClick={() => setSortBy("name")}
          className={`p-2 rounded ${
            sortBy === "name" ? "bg-sky-900" : "bg-sky-950"
          }`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy("category")}
          className={`p-2 rounded ${
            sortBy === "category" ? "bg-sky-900" : "bg-sky-950"
          }`}
        >
          Sort by Category
        </button>
        <button
          onClick={() => setSortBy("group")}
          className={`p-2 rounded ${
            sortBy === "group" ? "bg-sky-900 text-white" : "bg-sky-950"
          }`}
        >
          Group by Category
        </button>
      </div>
      <ul className="space-y-2">
        {sortBy === "group"
          ? Object.keys(groupedItems).map((category, index) => (
              <div key={index}>
                <h2 className="text-xl font-bold capitalize">{category}</h2>
                <ul className="space-y-2">
                  {groupedItems[category].map((item) => (
                    <Item
                      key={item.id}
                      name={item.name}
                      quantity={item.quantity}
                      category={item.category}
                      onSelect={() => onItemSelect(item)}
                    />
                  ))}
                </ul>
              </div>
            ))
          : sortedItems.map((item) => (
              <Item
                key={item.id}
                name={item.name}
                quantity={item.quantity}
                category={item.category}
                onSelect={() => onItemSelect(item)}
              />
            ))}
      </ul>
    </div>
  );
}
