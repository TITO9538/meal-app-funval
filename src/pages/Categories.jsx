import { useEffect, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories));
  }, []);

  return (
    <div className="w-full overflow-x-auto bg-white py-4">
      <div className="flex gap-4 px-4">
        {categories.map((cat) => (
          <div key={cat.idCategory} className="text-center min-w-[100px]">
            <img
              src={cat.strCategoryThumb}
              alt={cat.strCategory}
              className="w-20 h-20 object-cover rounded-full mx-auto"
            />
            <p className="text-sm mt-2">{cat.strCategory}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

