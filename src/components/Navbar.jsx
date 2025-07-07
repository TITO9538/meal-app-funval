import React from 'react'
import { Link } from 'react-router'

export function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">MyApp</div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-200 transition">Home</Link>
          <Link to="/search" className="text-white hover:text-blue-200 transition">Search</Link>
          <Link to="/categories" className="text-white hover:text-blue-200 transition">Categories</Link>
        </div>
      </div>
    </nav>
  )
}
