"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./item.json";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/week-9");
    }
  }, [user, router]);

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

  if (!user) {
    return null; // Return null while redirecting
  }

  return (
    <div className="p-8 bg-sky-950">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-5xl font-bold">Shopping List</h1>
        <button
          onClick={() => firebaseSignOut()}
          className="bg-red-600 hover:bg-red-500 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
        >
          Sign Out
        </button>
      </div>
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
