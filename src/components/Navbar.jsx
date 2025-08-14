import React from 'react'

const Navbar = () => {

    function handleclick(params) {
        alert("Work with todo list")
    }

    function handleHome() {
        alert("You are already on the home page")
    }

  return (
    <div className='Navbar flex bg-violet-500 text-black gap-8 h-12 justify-center items-center'>
        <div className="logo font-bold hover:cursor-pointer">
            <h1 onClick={handleclick} className='hover:bg-violet-400 hover:transition-all hover:cursor-pointer  border-black rounded-2xl p-1.5 border-2'>S-todo</h1>
        </div>
        <ul className='flex gap-8 '>
            <li className='hover:font-bold hover:scale-110 hover:cursor-pointer hover:underline' onClick={handleHome}>Home</li>
        </ul>
      
    </div>
  )
}

export default Navbar
