import React from "react";

export function RecipeCard({
  strMeal,
  strMealThumb,
  strIngredient,
  strMeasure,
  strInstructions,
  strCategory,
  strArea,
  strTags,
  strYoutube,
}) {
  return (
    <>
      <article className="w-[85%] h-[80%] flex flex-col md:flex-row bg-amber-50 shadow-xl rounded-xl overflow-hidden transition-all hover:shadow-xl/30 md:pb-3 dark:dark:bg-[#51312d] dark:text-yellow-100">
        <div className="flex flex-col">
          <div className="h-30 overflow-hidden flex items-center justify-center md:w-40 md:h-40">
            <img
              src={strMealThumb}
              alt={strMeal}
              className="transition-transform duration-800 hover:scale-115 object-cover w-full h-full md:w-80 md:h-40 rounded-t-xl md:rounded-t-none md:rounded-l-xl md:rounded-r-none md:rounded-bl-xl md:rounded-br-none"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold pt-3 px-4 duration-500 hover:scale-105">{strMeal}</h3>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col gap-1">
            <div className="px-5 pt-2 flex gap-2 text-xs text-gray-500 dark:text-gray-300 max-h-[15%] md:max-h-[73%] overflow-y-auto">
              <div>
                <h3 className="font-extrabold text-gray-800 dark:text-yellow-100">Ingredients</h3>
                <ul>
                  <li>{strIngredient.strIngredient1}</li>
                  <li>{strIngredient.strIngredient2}</li>
                  <li>{strIngredient.strIngredient3}</li>
                  <li>{strIngredient.strIngredient4}</li>
                  <li>{strIngredient.strIngredient5}</li>
                  <li>{strIngredient.strIngredient6}</li>
                  <li>{strIngredient.strIngredient7}</li>
                  <li>{strIngredient.strIngredient8}</li>
                  <li>{strIngredient.strIngredient9}</li>
                  <li>{strIngredient.strIngredient10}</li>
                  <li>{strIngredient.strIngredient11}</li>
                  <li>{strIngredient.strIngredient12}</li>
                  <li>{strIngredient.strIngredient13}</li>
                  <li>{strIngredient.strIngredient14}</li>
                  <li>{strIngredient.strIngredient15}</li>
                  <li>{strIngredient.strIngredient16}</li>
                  <li>{strIngredient.strIngredient17}</li>
                  <li>{strIngredient.strIngredient18}</li>
                  <li>{strIngredient.strIngredient19}</li>
                  <li>{strIngredient.strIngredient20}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-extrabold text-gray-800 dark:text-yellow-100">Measures</h3>
                <ul>
                  <li>{strMeasure.strMeasure1}</li>
                  <li>{strMeasure.strMeasure2}</li>
                  <li>{strMeasure.strMeasure3}</li>
                  <li>{strMeasure.strMeasure4}</li>
                  <li>{strMeasure.strMeasure5}</li>
                  <li>{strMeasure.strMeasure6}</li>
                  <li>{strMeasure.strMeasure7}</li>
                  <li>{strMeasure.strMeasure8}</li>
                  <li>{strMeasure.strMeasure9}</li>
                  <li>{strMeasure.strMeasure10}</li>
                </ul>
              </div>
            </div>
            <div className="px-3 pt-2 pb-4 flex-col gap-2 text-xs text-gray-700">
              <div className="flex flex-col md:flex-row md:gap-3">
                <div>
                  <h3 className="font-extrabold text-gray-800 dark:text-yellow-100">Details</h3>
                  <div className="px-2 flex">
                    <p className="dark:text-gray-300">{strCategory}</p>
                    <p className="mx-2">|</p>
                    <p className="dark:text-gray-300">{strArea}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-800 pt-2 md:pt-0 dark:text-yellow-100">Tags</h3>
                  <p className="px-2 dark:text-gray-300">{strTags}</p>
                </div>
              </div>
              <h3 className="font-extrabold text-gray-800 pt-2 dark:text-yellow-100">YouTube</h3>
              <a
                href={strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 text-blue-700 hover:underline dark:text-blue-400">
                Watch Video
              </a>
            </div>
          </div>
          <div className="flex md:flex-col justify-between">
            <div className="px-5 pt-2 flex-col gap-2 text-xs text-gray-700">
              <h3 className="font-extrabold text-gray-800 dark:text-yellow-100">Instructions</h3>
              <p className="max-h-[20%] overflow-y-auto md:max-h-[100%] dark:text-gray-200">{strInstructions}</p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

{
  /* 
    ASI ES COMO DEBERIA SER LLAMADO DESDE SUS PAGINAS, EL "MEAL" SIGNIFICA EL NOMBRE DE SU ARRAY DE COMIDAS

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
  key={meal.idMeal}>
</RecipeCard>;
  
  */
}
