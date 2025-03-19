"use client";
import { useState, useEffect } from "react";

async function fetchMealIdeas(ingredient) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

async function fetchMealDetails(id) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [selectedMealDetails, setSelectedMealDetails] = useState(null);

  async function loadMealIdeas(ingredient) {
    if (!ingredient) {
      setMeals([]);
      return;
    }
    const mealData = await fetchMealIdeas(ingredient);
    setMeals(mealData || []);
    setSelectedMealId(null);
    setSelectedMealDetails(null);
  }

  async function handleMealClick(mealId) {
    if (selectedMealId === mealId) {
      // Toggle off if already selected
      setSelectedMealId(null);
      setSelectedMealDetails(null);
      return;
    }

    setSelectedMealId(mealId);
    const mealDetails = await fetchMealDetails(mealId);
    setSelectedMealDetails(mealDetails);
  }

  // Extract ingredients and measurements from meal data
  function getIngredients(meal) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({
          ingredient: ingredient,
          measure: measure || "",
        });
      }
    }

    return ingredients;
  }

  useEffect(() => {
    loadMealIdeas(ingredient);
  }, [ingredient]);

  return (
    <div className="w-full max-w-md bg-gray-300 p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl text-gray-900 font-semibold text-center mb-6">
        {ingredient
          ? `Meal Ideas for ${ingredient}`
          : "Select an item to see meal ideas"}
      </h2>

      {meals.length > 0 ? (
        <ul className="space-y-2">
          {meals.map((meal) => (
            <li
              key={meal.idMeal}
              className="bg-sky-900 rounded overflow-hidden"
            >
              <div
                className="p-3 hover:bg-sky-800 cursor-pointer transition-colors"
                onClick={() => handleMealClick(meal.idMeal)}
              >
                <h3 className="text-xl font-bold">{meal.strMeal}</h3>
              </div>

              {selectedMealId === meal.idMeal && selectedMealDetails && (
                <div className="bg-sky-950 p-3 text-gray-300">
                  <p className="mb-2">Ingredients needed:</p>
                  <ul className="space-y-1 pl-4">
                    {getIngredients(selectedMealDetails).map((item, index) => (
                      <li key={index} className="text-gray-400 flex">
                        <span className="w-1/2">
                          {item.measure ? `${item.measure}` : ""}
                        </span>
                        <span className="w-1/2">{item.ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-900">No meal ideas found</p>
      )}
    </div>
  );
}
