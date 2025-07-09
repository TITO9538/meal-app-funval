import { useEffect, useState } from "react";

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
    <div className="px-4 py-6 bg-orange-100 p-4 max-w-5xl mx-auto min-h-screen">
      {/* Carrusel de categorías */}
      <div className="overflow-x-auto bg-orange-50 h-35 ">
        <div className="flex gap-4 ">
          {categories.map((cat) => (
            <div
              key={cat.idCategory}
              className="text-center min-w-[100px] cursor-pointer hover:scale-125 transition-transform "
              onClick={() => setSelectedCategory(cat.strCategory)}
            >
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
        <article
          key={meal.idMeal}
          className="w-80 h-[280px] shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl/30 cursor-pointer bg-orange-300"
        >
          <div className="w-80 h-48 overflow-hidden flex items-center justify-center ">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="transition-transform duration-800 hover:scale-110 object-cover w-full h-full "
            />
          </div>
          <div>
            <h3 className="text-xl font-bold pt-3 px-4 duration-500 hover:scale-105">
              {meal.strMeal}
            </h3>
          </div>
          <div className="px-5 pt-2 flex gap-2 text-xs text-gray-500">
            <p>{selectedCategory}</p>
            {/* Si tienes área puedes ponerla aquí, si no, lo eliminas */}
          </div>
        </article>
      ))}
    </div>
  </>
)}

    </div>
  );
}

