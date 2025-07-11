import React, { useState } from "react";
import { Link } from "react-router";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed w-full bg-yellow-100/50 p-4 min-h-16  dark:bg-amber-900/50 transition-colors duration-500 ease-in-out z-20">
      <div className="container mx-auto flex justify-between items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-8 text-amber-800 md:hidden cursor-pointer dark:text-yellow-100 transition-colors duration-500 ease-in-out "
          onClick={toggleMenu}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
          />
        </svg>

        <div className="space-x-4 hidden md:block text-yellow-800 font-bold text-lg dark:text-yellow-100 transition-colors duration-500 ease-in-out">
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
        <img src="./logo.png" alt="MyApp Logo" className="size-20 md:mr-28 dark:hidden" />
        <img
          src="./logo-dark.png"
          alt="MyApp Logo Dark"
          className="hidden dark:block size-20 md:mr-28"
        />
        <h1 className="text-yellow-800 font-bold text-2xl dark:text-yellow-100 ">Rata-Trampa</h1>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-2 text-yellow-800 font-bold text-lg dark:text-yellow-100 transition-colors duration-500 ease-in-out">
          <Link
            to="/"
            className="hover:text-yellow-500 transition"
            onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link
            to="/search"
            className="hover:text-yellow-500 transition"
            onClick={() => setIsOpen(false)}>
            Search
          </Link>
          <Link
            to="/categories"
            className="hover:text-yellow-500 transition"
            onClick={() => setIsOpen(false)}>
            Categories
          </Link>
        </div>
      )}
    </nav>
  );
}
