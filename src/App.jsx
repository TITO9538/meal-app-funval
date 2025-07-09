import React from 'react'
import { Navbar } from './components/Navbar'
import { Route, Routes } from 'react-router'
import { Home } from './pages/home.jsx'
import { Search } from './pages/Search.jsx'
import Categories from './pages/Categories.jsx'
import Footer from './components/Footer.jsx'
import { Card } from './components/Card.jsx'

export default function App() {
  return (
    <div>
    <Navbar></Navbar>
    <Routes>
      <Route path='/' element={<Home></Home>}/>
      <Route path='/search' element={<Search></Search>}/>
      <Route path='/categories' element={<Categories> cat1</Categories>}/>
      <Route path='*' element={<h1>404 Not Found</h1>}/>
    </Routes>
    <Footer></Footer>
    </div>
  )
}
