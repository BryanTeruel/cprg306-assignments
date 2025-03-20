import { db } from "../_utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export async function getItems(userId) {
  const items = [];

  // Reference to the items subcollection for this user
  const userItemsRef = collection(db, "users", userId, "items");

  // Get all documents from the subcollection
  const querySnapshot = await getDocs(userItemsRef);

  // Add each document's data and ID to our items array
  querySnapshot.forEach((doc) => {
    items.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return items;
}

export async function addItem(userId, item) {
  // Reference to the items subcollection for this user
  const userItemsRef = collection(db, "users", userId, "items");

  // Add the new item to the subcollection
  const docRef = await addDoc(userItemsRef, item);

  // Return the ID of the newly created document
  return docRef.id;
}

export async function deleteItem(userId, itemId) {
  // Reference to the specific item document
  const itemRef = doc(db, "users", userId, "items", itemId);

  // Delete the document
  await deleteDoc(itemRef);

  return itemId;
}
