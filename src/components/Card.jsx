import React, { useEffect, useState } from "react";
import { RecipeCard } from "./RecipeCard";
import axios from "axios";

export function Card({ strMeal, strMealThumb, strCategory, strArea, mealId }) {
  const [modalOn, setModalOn] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [mealDetails, setMealDetails] = useState(null);

  function toggleModal() {
    setModalOn((prev) => {
      return !prev;
    });
  }

  const modalOut = (e) => {
    const { id } = e.target;
    if (id === "modal") {
      toggleModal();
    }
  };

  const showId = (e) => {
    const id = e.currentTarget.id;
    setSelectedMealId(id);
  };

  useEffect(() => {
    if (selectedMealId) {
      async function getData() {
        try {
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedMealId}`
          );
          setMealDetails(response.data.meals[0]);
        } catch (error) {
          console.error("Error fetching meal details:", error);
        }
      }
      getData();
    }
  }, [selectedMealId]);

  return (
    <>
      <article
        onClick={(e) => {
          toggleModal();
          showId(e);
        }}
        id={mealId}
        className="w-70 h-70 md:w-80 shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl/30">
        <div className="w-full h-50 overflow-hidden flex items-center justify-center">
          <img
            src={strMealThumb}
            alt={strMeal}
            className="transition-transform duration-800 hover:scale-110"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold pt-3 px-4 duration-500 hover:scale-105 dark:text-yellow-100">
            {strMeal}
          </h3>
        </div>
        <div className="px-5 pt-2 flex gap-2 text-xs text-gray-500 dark:text-yellow-50">
          <p>{strCategory}</p>
          {strCategory && <span className="text-gray-600">|</span>}
          <p>{strArea}</p>
        </div>
      </article>
      {modalOn && mealDetails && (
        <div
          id="modal"
          className="fixed h-screen inset-0 bg-gray-900/60 flex items-center justify-center z-50"
          onClick={modalOut}>
          <RecipeCard
            strMeal={mealDetails.strMeal}
            strMealThumb={mealDetails.strMealThumb}
            strIngredient={mealDetails}
            strMeasure={mealDetails}
            strInstructions={mealDetails.strInstructions}
            strCategory={mealDetails.strCategory}
            strArea={mealDetails.strArea}
            strTags={mealDetails.strTags}
            strYoutube={mealDetails.strYoutube}
            key={mealDetails.idMeal}
          />
        </div>
      )}
    </>
  );
}
