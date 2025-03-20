"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";
import {
  getItems,
  addItem,
  deleteItem,
} from "../_services/shopping-list-service";

export default function Page() {
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/week-10");
    }
  }, [user, router]);

  // Memoize the loadItems function with useCallback
  const loadItems = useCallback(async () => {
    if (user) {
      try {
        const userItems = await getItems(user.uid);
        // Ensure we always set an array, even if Firestore returns null or undefined
        setItems(Array.isArray(userItems) ? userItems : []);
      } catch (error) {
        console.error("Error loading items:", error);
        setItems([]); // Set to empty array on error
      }
    }
  }, [user]); // Add user as a dependency since it's used inside the function

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user, loadItems]); // Now we can safely add loadItems to the dependency array

  const handleAddItem = async (newItem) => {
    if (user) {
      try {
        const id = await addItem(user.uid, newItem);
        newItem.id = id;
        setItems([...items, newItem]);
      } catch (error) {
        console.error("Error adding item:", error);
        alert("Failed to add item. Please try again.");
      }
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (user) {
      try {
        console.log(`Attempting to delete item with ID: ${itemId}`);

        // First update the UI state to remove the item
        setItems(items.filter((item) => item.id !== itemId));

        // Then delete from Firestore
        await deleteItem(user.uid, itemId);
        console.log(`Item with ID: ${itemId} successfully deleted`);

        // Reload items from Firestore to ensure UI is in sync with database
        loadItems();
      } catch (error) {
        console.error("Error deleting item:", error);
        // If deletion fails, reload the items to restore the correct state
        loadItems();
        alert("Failed to delete item. Please try again.");
      }
    }
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
          <ItemList
            items={items}
            onItemSelect={handleItemSelect}
            onItemDelete={handleDeleteItem}
          />
        </div>
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </div>
  );
}
