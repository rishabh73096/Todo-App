import { useState } from "react";
import { useTodo } from "../Contexts/TodoContext";

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const { updateTodo, deleteTodo} = useTodo();

    const { toggleComplete} = useTodo(); 
    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg });
        setIsTodoEditable(false);
    };

    const handleToggleCompleted = () => {
        toggleComplete(todo.id);
    };

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            {/* <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={handleToggleCompleted}
            /> */}
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-20 h-10 rounded-lg text-Md border border-black/10 justify-center items-center bg-gray-500 hover:bg-red-600 shrink-0 disabled:opacity-50 bg-red-500 text-white"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "Save" : "Edit"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-20 h-10 rounded-lg text-md border border-black/10 justify-center items-center bg-gray-50 hover:bg-red-600 shrink-0 bg-red-500 text-white"
                onClick={() => deleteTodo(todo.id)}
            >
                Remove
            </button>
        </div>
    );
}

export default TodoItem;
