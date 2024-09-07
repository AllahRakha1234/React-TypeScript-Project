import React from 'react'
import AddTodo from './Components/AddTodo';
import TodosPage from './Components/TodosPage';
import Navbar from './Components/Navbar';
import './App.css'

const App = () => {
  return (
    <main className="main">
      <h2 >Todo REACT + TYPESCRIPT</h2>
      <Navbar/>
      <AddTodo/>
      <TodosPage/>
    </main>
  )
}

export default App