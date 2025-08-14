import { useState } from 'react'
import Navbar from './components/Navbar'
import TodoContainer from './components/TodoContainer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="todolist bg-violet-100 min-h-[100vh]">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="alltodo flex items-center justify-center">
          <TodoContainer />
        </div>
      </div>
    </>
  )
}

export default App
