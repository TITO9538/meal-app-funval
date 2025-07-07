import React, { useState } from "react";
import { Link } from "react-router";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-yellow-100 p-4 min-h-24 border-b border-yellow-300">
      <div className="container mx-auto flex justify-between items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-8 text-amber-800 md:hidden cursor-pointer"
          onClick={toggleMenu}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
          />
        </svg>

        <div className="space-x-4 hidden md:block text-yellow-800 font-bold text-lg">
          <Link to="/" className="hover:text-yellow-500 transition">
            Home
          </Link>
          <Link to="/search" className="hover:text-yellow-500 transition">
            Search
          </Link>
          <Link to="/categories" className="hover:text-yellow-500 transition">
            Categories
          </Link>
        </div>
        <img src="./logo.png" alt="MyApp Logo" className="size-16" />
        <h1 className="text-yellow-800 font-bold text-2xl">Rat-Trap</h1>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-2 text-yellow-800 font-bold text-lg">
          <Link
            to="/"
            className="hover:text-yellow-500 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/search"
            className="hover:text-yellow-500 transition"
            onClick={() => setIsOpen(false)}
          >
            Search
          </Link>
          <Link
            to="/categories"
            className="hover:text-yellow-500 transition"
            onClick={() => setIsOpen(false)}
          >
            Categories
          </Link>
        </div>
      )}
      
    </nav>
  );
}
