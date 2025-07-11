import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';

function SkeletonCard() {
  return (
    <div
      role="status"
      className="space-y-4 animate-pulse rounded-md p-4 bg-gray-200 dark:bg-gray-700"
    >
      <div className="flex items-center justify-center w-full h-32 bg-gray-300 rounded sm:h-48">
        <svg
          className="w-10 h-10 text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="h-3 bg-gray-300 rounded-full w-3/4"></div>
      <div className="h-2 bg-gray-300 rounded-full w-1/2"></div>
      <span className="sr-only">Cargando...</span>
    </div>
  );
}

function SmallSkeletonCard() {
  return (
    <div
      role="status"
      className="w-full max-w-[160px] p-2 border border-gray-200 rounded-md shadow-sm animate-pulse bg-[#FAB37A] dark:border-gray-700"
    >
      <div className="flex items-center justify-center h-24 mb-3 bg-gray-300 rounded dark:bg-gray-700">
        <svg
          className="w-6 h-6 text-gray-200 dark:text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
        </svg>
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full w-3/4 mx-auto mb-2"></div>
      <div className="h-2 bg-gray-200 rounded-full w-1/2 mx-auto"></div>
      <span className="sr-only">Cargando...</span>
    </div>
  );
}

export function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('popular');
  const [isTyping, setIsTyping] = useState(false);
  const [randomMeals, setRandomMeals] = useState([]);

  const popularMeals = ['Pizza', 'Pasta', 'Chicken', 'Burger', 'Salad'];

  const fetchRandomMeals = async () => {
    try {
      const promises = Array(10).fill().map(() =>
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
          .then(res => res.json())
          .then(data => data.meals[0])
      );
      const randomMealsData = await Promise.all(promises);
      setRandomMeals(randomMealsData);
    } catch (err) {
      console.error('Error fetching random meals:', err);
    }
  };

  useEffect(() => {
    fetchRandomMeals();
  }, []);

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
    <div className="p-4 max-w-5xl mx-auto min-h-screen" style={{ backgroundColor: '#F5E0C3' }}>
      <h1 className="text-3xl font-bold text-center mb-6" style={{ color: '#4C2A20' }}>
        ¡Encuentra tu comida favorita!
      </h1>

      <div className="relative w-full max-w-2xl mx-auto">
        <div className="flex shadow-md rounded overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej: Pizza, Pasta, Chicken..."
            className="w-full px-4 py-3 focus:outline-none"
            style={{
              backgroundColor: '#FAB37A',
              borderColor: '#D86C30',
              color: '#4C2A20'
            }}
            onFocus={() => setIsTyping(true)}
            onBlur={() => setTimeout(() => setIsTyping(false), 200)}
          />
          <button
            onClick={() => handleSearch()}
            className="px-5 py-3 transition hover:bg-opacity-90"
            style={{
              backgroundColor: '#D86C30',
              color: '#F5E0C3'
            }}
          >
            Buscar
          </button>
        </div>

        {isTyping && query.length >= 2 && suggestions.length > 0 && (
          <ul
            className="absolute z-10 w-full rounded shadow mt-1 max-h-60 overflow-y-auto"
            style={{
              backgroundColor: '#FAB37A',
              borderColor: '#D86C30'
            }}
          >
            {suggestions.map((meal) => (
              <li
                key={meal.idMeal}
                onClick={() => {
                  setQuery(meal.strMeal);
                  setSuggestions([]);
                  setIsTyping(false);
                  handleSearch(meal.strMeal);
                }}
                className="px-4 py-2 hover:bg-[#D86C30] cursor-pointer transition"
                style={{
                  backgroundColor: '#FE8631',
                  color: '#4C2A20'
                }}
              >
                {meal.strMeal}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-8 mb-4">
        <button
          className={`px-4 py-2 rounded-t-md font-semibold transition ${activeTab === 'popular' ? 'text-white' : 'text-gray-800'}`}
          style={{
            backgroundColor: activeTab === 'popular' ? '#D86C30' : '#FAB37A'
          }}
          onClick={() => {
            setActiveTab('popular');
            setSuggestions([]);
            setQuery('');
          }}
        >
          Populares
        </button>
        <button
          className={`px-4 py-2 rounded-t-md font-semibold transition ${activeTab === 'results' ? 'text-white' : 'text-gray-800'}`}
          style={{
            backgroundColor: activeTab === 'results' ? '#D86C30' : '#FAB37A'
          }}
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
                className="font-semibold py-3 rounded-lg shadow hover:bg-[#D86C30] transition"
                style={{
                  backgroundColor: '#FE8631',
                  color: '#4C2A20'
                }}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {activeTab === 'results' && (
          <div className="mt-6">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {Array(6).fill().map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {results.map((meal) => (
                  <Card
                    strMeal={meal.strMeal}
                    strMealThumb={meal.strMealThumb}
                    strCategory={meal.strCategory}
                    strArea={meal.strArea}
                    key={meal.idMeal}
                  />
                ))}
              </div>
            ) : (
              query && <p className="text-center" style={{ color: '#4C2A20' }}>No se encontraron comidas con ese nombre.</p>
            )}
          </div>
        )}
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4" style={{ color: '#4C2A20' }}>
        Los platos más pedidos
      </h2>

      <div className="w-full mt-4">
        {randomMeals.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-10 justify-items-center">
            {randomMeals.map((meal) => (
              <div
                key={meal.idMeal}
                className="rounded-lg shadow p-4 hover:shadow-lg transition cursor-pointer"
                style={{
                  backgroundColor: '#FAB37A',
                  color: '#4C2A20',
                  width: '100%',
                  maxWidth: '260px'
                }}
                onClick={() => {
                  setQuery(meal.strMeal);
                  handleSearch(meal.strMeal);
                }}
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-32 object-cover rounded-md mb-2"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
                <h3 className="font-semibold text-center">{meal.strMeal}</h3>
                <p className="text-xs text-center">{meal.strCategory}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-8 justify-items-center">
            {Array.from({ length: 9 }).map((_, index) => (
              <SmallSkeletonCard key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}