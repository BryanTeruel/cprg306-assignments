"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./item.json";
import MealIdeas from "./meal-ideas";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleItemSelect = (item) => {
    // Clean up the item name by removing size and emoji
    const cleanName = item.name
      .split(",")[0] // Remove anything after a comma
      .trim() // Remove leading/trailing spaces
      .replace(/\p{Emoji}/gu, "") // Remove emojis
      .trim(); // Remove any spaces left after emoji removal

    setSelectedItemName(cleanName);
  };

  return (
    <div className="p-8 bg-sky-950">
      <h1 className="text-5xl font-bold mb-6">Shopping List</h1>
      <div className="flex">
        <div>
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </div>
  );
}
