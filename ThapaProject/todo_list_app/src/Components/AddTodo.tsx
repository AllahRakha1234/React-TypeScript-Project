import React, { useState } from "react";
import { useTodos } from "../Store/Todos";

const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const { handleAddTodo } = useTodos();

  const hanldeFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddTodo(todo);
    setTodo("");
  };
  return (
    <form onSubmit={hanldeFormSubmit}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        name="todo"
        id="todo"
        placeholder="Enter your todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodo;
