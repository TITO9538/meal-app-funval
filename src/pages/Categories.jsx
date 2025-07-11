import { useEffect, useState } from "react";
import { Card } from "../components/Card";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [meals, setMeals] = useState([]);

  // Obtener categorías al inicio
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories));
  }, []);

  // Obtener comidas cuando cambia la categoría seleccionada
  useEffect(() => {
    if (!selectedCategory) return;

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => setMeals(data.meals));
  }, [selectedCategory]);

  return (
    <div className="px-4 py-6 bg-[#F5E0C3] p-4 max-w-5xl mx-auto min-h-screen">
      {/* Carrusel de categorías */}
      <div className="overflow-x-auto bg-orange-50 h-35 ">
        <div className="flex gap-4 ">
          {categories.map((cat) => (
            <div
              key={cat.idCategory}
              className="text-center min-w-[100px] cursor-pointer hover:scale-115 transition-transform "
              onClick={() => setSelectedCategory(cat.strCategory)}>
              <img
                src={cat.strCategoryThumb}
                alt={cat.strCategory}
                className="w-20 h-20 object-cover rounded-full mx-auto border-2 border-gray-300"
              />
              <p className="text-sm mt-2">{cat.strCategory}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mostrar comidas si hay */}
      {selectedCategory && (
        <>
          <h2 className="text-xl font-bold mt-8 mb-4 text-center ">
            Comidas de {selectedCategory}
          </h2>
          <div className="flex flex-wrap justify-center gap-4  ">
            {meals.map((meal) => (
              <Card
                strMeal={meal.strMeal}
                strMealThumb={meal.strMealThumb}
                key={meal.idMeal}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
