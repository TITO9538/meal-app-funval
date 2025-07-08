import React, { useState, useEffect } from 'react';

export function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('popular');
  const [isTyping, setIsTyping] = useState(false);

  const popularMeals = ['Pizza', 'Pasta', 'Chicken', 'Burger', 'Salad'];

  const handleSearch = async (value = query) => {
    if (!value) return;
    setLoading(true);
    setSuggestions([]);
    setIsTyping(false);
    setActiveTab('results');
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
      const data = await res.json();
      setResults(data.meals || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (query.length >= 2) {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await res.json();
        setSuggestions(data.meals ? data.meals.slice(0, 5) : []);
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-6">¡Encuentra tu comida favorita!</h1>

     
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="flex shadow-md rounded overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej: Pizza, Pasta, Chicken..."
            className="w-full px-4 py-3 focus:outline-none border border-gray-300"
            onFocus={() => setIsTyping(true)}
            onBlur={() => setTimeout(() => setIsTyping(false), 200)}
          />
          <button
            onClick={() => handleSearch()}
            className="bg-red-600 text-white px-5 py-3 hover:bg-red-700 transition"
          >
            Buscar
          </button>
        </div>

        
        {isTyping && query.length >= 2 && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded shadow mt-1 max-h-60 overflow-y-auto">
            {suggestions.map((meal) => (
              <li
                key={meal.idMeal}
                onClick={() => {
                  setQuery(meal.strMeal);
                  setSuggestions([]);
                  setIsTyping(false);
                  handleSearch(meal.strMeal);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {meal.strMeal}
              </li>
            ))}
          </ul>
        )}
      </div>

      
      <div className="flex justify-center gap-4 mt-8 mb-4">
        <button
          className={`px-4 py-2 rounded-t-md font-semibold ${
            activeTab === 'popular' ? 'bg-red-600 text-white' : 'bg-gray-100'
          }`}
          onClick={() => {
            setActiveTab('popular');
            setSuggestions([]);
            setQuery('');
          }}
        >
           Populares
        </button>
        <button
          className={`px-4 py-2 rounded-t-md font-semibold ${
            activeTab === 'results' ? 'bg-red-600 text-white' : 'bg-gray-100'
          }`}
          onClick={() => setActiveTab('results')}
        >
           Resultados
        </button>
      </div>

      
      <div className="mt-2">
        {activeTab === 'popular' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
            {popularMeals.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setQuery(item);
                  handleSearch(item);
                }}
                className="bg-yellow-100 text-yellow-800 font-semibold py-3 rounded-lg shadow hover:bg-yellow-200 transition"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {activeTab === 'results' && (
          <div className="mt-6">
            {loading ? (
              <div className="text-center text-gray-600 animate-pulse text-lg">Buscando resultados...</div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {results.map((meal) => (
                  <div
                    key={meal.idMeal}
                    className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                  >
                    <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800">{meal.strMeal}</h3>
                      <p className="text-sm text-gray-500">{meal.strCategory} | {meal.strArea}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              query && <p className="text-center text-gray-500">No se encontraron comidas con ese nombre.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}