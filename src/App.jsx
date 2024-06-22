import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";
import { TodoProvider } from "./Contexts/TodoContext";
import { useEffect, useState } from "react";
function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const togllecomplte = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      
      <TodoProvider
        value={{ todos, addTodo, updateTodo, deleteTodo, togllecomplte }}
      >
        <div className="bg-[#25122b] min-h-screen py-10">
          <div className="w-full max-w-5xl mx-auto shadow-lg rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">
              Add And Manage Your Todos
            </h1>
            <div className="mb-4">
              <TodoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
              {todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </TodoProvider>
      
    </>
  );
}

export default App;
