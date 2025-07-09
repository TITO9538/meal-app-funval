import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';

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
                className="px-4 py-2 hover:bg-opacity-80 cursor-pointer transition"
                style={{
                  backgroundColor: '#FE8631',
                  color: '#4C2A20',
                  '&:hover': {
                    backgroundColor: '#D86C30'
                  }
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
                className="font-semibold py-3 rounded-lg shadow hover:shadow-md transition"
                style={{
                  backgroundColor: '#FE8631',
                  color: '#4C2A20',
                  '&:hover': {
                    backgroundColor: '#D86C30'
                  }
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
              <div className="text-center text-lg" style={{ color: '#4C2A20' }}>Buscando resultados...</div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {results.map((meal) => (
                  <Card
                  strMeal={meal.strMeal}
                  strMealThumb={meal.strMealThumb}
                  strCategory={meal.strCategory}
                  strArea={meal.strArea}
                  key={meal.idMeal}
                  ></Card>
                ))}
              </div>
            ) : (
              query && <p className="text-center" style={{ color: '#4C2A20' }}>No se encontraron comidas con ese nombre.</p>
            )}
          </div>
        )}
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4" style={{ color: '#4C2A20' }}>
        Los platos mas pedidos
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {randomMeals.length > 0 ? (
          randomMeals.map((meal) => (
            <div
              key={meal.idMeal}
              className="rounded-lg shadow p-4 hover:shadow-lg transition cursor-pointer"
              style={{
                backgroundColor: '#FAB37A',
                color: '#4C2A20'
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
          ))
        ) : (
          <p className="col-span-full text-center" style={{ color: '#4C2A20' }}>Cargando recomendaciones...</p>
        )}
      </div>
    </div>
  );
}