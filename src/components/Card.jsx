import React, { useState } from "react";
import { RecipeCard } from "./recipeCard";

export function Card({ strMeal, strMealThumb, strCategory, strArea }) {
  const [modalOn, setModalOn] = useState(false);

  function tooggleModal() {
    setModalOn(!modalOn);
  }

  return (
    <>
      <article
        onClick={() => tooggleModal()}
        className="w-70 h-70 md:w-80 shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl/30">
        <div className="w-full h-50 overflow-hidden flex items-center justify-center">
          <img
            src={strMealThumb}
            alt={strMeal}
            className="transition-transform duration-800 hover:scale-110"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold pt-3 px-4 duration-500 hover:scale-105">{strMeal}</h3>
        </div>
        <div className="px-5 pt-2 flex gap-2 text-xs text-gray-500">
          <p>{strCategory}</p>
          {strCategory && <span className="text-gray-600">|</span>}
          <p>{strArea}</p>
        </div>
      </article>
      {modalOn && (
        <>
          <RecipeCard
            strMeal={meal.strMeal}
            strMealThumb={meal.strMealThumb}
            strIngredient={meal}
            strMeasure={meal}
            strInstructions={meal.strInstructions}
            strCategory={meal.strCategory}
            strArea={meal.strArea}
            strTags={meal.strTags}
            strYoutube={meal.strYoutube}
            key={meal.idMeal}></RecipeCard>
        </>
      )}
    </>
  );
}