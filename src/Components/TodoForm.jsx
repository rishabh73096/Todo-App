import { useState } from "react";
import { useTodo } from "../Contexts/TodoContext";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo(); // Correctly call the useTodo hook

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ todo, completed: false });
    setTodo("");
  };

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Your Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-5 py-1 bg-red-500 text-white shrink-0  bg-gray-500 hover:bg-red-600 "
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
