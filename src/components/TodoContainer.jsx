import React, { useEffect, useState } from 'react';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

const TodoContainer = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all"); // all | finished | unfinished

    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
        setFilter("all");
    }, []);

    const saveToLs = (newTodos) => {
        localStorage.setItem("todos", JSON.stringify(newTodos));
    };

    const handleAdd = () => {
        if (!todo.trim()) {
            alert("Write Something");
            return;
        }
        const updatedTodo = [
            ...todos,
            { id: uuidv4(), Todo: todo, isCompleted: false }
        ];
        setTodos(updatedTodo);
        saveToLs(updatedTodo);
        setTodo("");
    };

    const handleChange = (e) => {
        setTodo(e.target.value);
    };

    const handleCheckbox = (e) => {
        const id = e.target.name;
        const updatedTodos = todos.map(item =>
            item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
        );
        setTodos(updatedTodos);
        saveToLs(updatedTodos);
    };

    const handleEdit = (id) => {
    const todoToEdit = todos.find(i => i.id === id);
    if (!todoToEdit) return; // agar na mile to skip

    setTodo(todoToEdit.Todo);

    
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
    saveToLs(updatedTodos);
};


   

    const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
        const updatedTodos = todos.filter(item => item.id !== id);
        saveToLs(updatedTodos);
        setTodos(updatedTodos);
    }
};

    const filteredTodos =
        filter === "all"
            ? todos
            : filter === "finished"
                ? todos.filter(item => item.isCompleted)
                : todos.filter(item => !item.isCompleted);

    return (
        <div className="container items-center bg-violet-400 w-full sm:w-[80%] md:w-[70%] lg:w-[50%] my-3 rounded-2xl flex flex-col p-4 sm:p-5 border-2 min-h-[80vh] shadow-lg mx-auto">
            <h1 className="font-bold text-2xl sm:text-3xl my-3 text-black animate-bounce text-center hover:cursor-pointer">
                Your To-do List
            </h1>

            {/* Add Todo */}
            <div className="addtodo flex flex-col sm:flex-row items-center my-2 w-full sm:w-[90%] sm:gap-0 gap-2 ">
                <input
                    type="text"
                    name="addtodo"
                    onChange={handleChange}
                    value={todo}
                    className="border-2 w-full border-black rounded-2xl sm:rounded-l-2xl sm:rounded-r-none p-2 focus:outline-none focus:border-black transition duration-300 bg-white hover:cursor-pointer"
                    placeholder="Write your task..."
                />
                <button
                    className="w-full sm:w-auto p-2.5 bg-black hover:bg-gray-700 text-white font-bold rounded-2xl sm:rounded-r-2xl sm:rounded-l-none transition duration-300 transform hover:scale-105 hover:cursor-pointer"
                    onClick={handleAdd}
                >
                    Save
                </button>
            </div>

            {/* Filter Options */}
            {todos.length > 0 && (

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 my-3 text-base sm:text-lg">
                    <label className="flex items-center gap-1 cursor-pointer">
                        <input
                            type="radio"
                            name="filter"
                            checked={filter === "all"}
                            onChange={() => setFilter("all")}
                            className='hover:cursor-pointer'
                        />
                        All Tasks
                    </label>

                    <label className="flex items-center gap-1 cursor-pointer">
                        <input
                            type="radio"
                            name="filter"
                            checked={filter === "finished"}
                            onChange={() => setFilter("finished")}
                            className='hover:cursor-pointer'
                        />
                        Finished
                    </label>

                    <label className="flex items-center gap-1 cursor-pointer">
                        <input
                            type="radio"
                            name="filter"
                            checked={filter === "unfinished"}
                            onChange={() => setFilter("unfinished")}
                            className='hover:cursor-pointer'
                        />
                        Unfinished
                    </label>
                </div>
            )}

            {/* Todo List */}
            <div className="alltodo border-2 border-black items-center bg-violet-300 rounded-2xl w-full sm:w-[90%] flex flex-col p-3">
                {filteredTodos.length === 0 ? (
                    <h2 className="text-lg sm:text-[20px] font-bold text-gray-600 animate-pulse text-center hover:cursor-pointer">
                        No Todos To Display
                    </h2>
                ) : (
                    filteredTodos.map(item => (
                        <div
                            key={item.id}
                            className="todos w-full sm:w-[90%] flex flex-col sm:flex-row gap-2 sm:gap-1 p-2 border-2 rounded-xl border-black m-1.5 justify-between items-center bg-violet-200 transition-transform duration-300 hover:scale-105"
                        >
                            <div className="box-text flex gap-2.5 items-center w-full sm:w-auto hover:cursor-pointer ">
                                <input
                                    type="checkbox"
                                    name={item.id}
                                    onChange={handleCheckbox}
                                    checked={item.isCompleted}
                                />
                                <div
                                    className={
                                        item.isCompleted
                                            ? "line-through text-gray-600"
                                            : "text-black "
                                    }
                                >
                                    {item.Todo}
                                </div>
                            </div>
                            <div className="buttons flex justify-center sm:justify-evenly gap-2.5 w-full sm:w-auto">
                                <button
                                onClick={() => handleEdit(item.id)}
                                  
                                    className="edit border-1 px-3 py-1 rounded-xl bg-black hover:bg-gray-700 text-white transition duration-300 hover:cursor-pointer"
                                   
                                >
                                    <MdEdit />
                                </button>
                                <button
                                onClick={(e) => handleDelete(item.id)}
                                   
                                    className="delete border-1 px-3 py-1 rounded-xl bg-white hover:bg-red-600 text-black transition duration-300 hover:cursor-pointer"
                                   
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TodoContainer;
