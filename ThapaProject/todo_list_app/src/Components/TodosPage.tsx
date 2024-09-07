import React, {useState} from 'react'
import { Todo, useTodos } from "../Store/Todos";
import {useSearchParams} from "react-router-dom";
import "../App.css";

const TodosPage = () => {
    const {todos} = useTodos();
    const {hanldeCheckBoxTodoBtn} = useTodos();
    const {hanldeDeleteTodoBtn} = useTodos();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("todos");

    let filterData = todos;

    if(query === "active"){
        filterData = todos.filter((todo:Todo)=>todo.completed === false);
    }

    if(query === "completed"){
        filterData = todos.filter((todo:Todo)=>todo.completed === true);
    }


  return (
    <div>
        <ul className="main-task ">
        {
            filterData.map((todo:Todo)=>{
                return <li key={todo.id}>
                    <input type="checkbox" id={`todo-${todo.id}`} checked={todo.completed} onChange={()=>{hanldeCheckBoxTodoBtn(todo.id)}}/>
                    <label htmlFor="`todo-${todo.id}`"> {todo.task}</label>
                    {
                        todo.completed && 
                            <button type="button" onClick={()=>{hanldeDeleteTodoBtn(todo)}} className="btn">Delete</button>
                    }
                </li>
            })
        }
        </ul>
    </div>
  )
}

export default TodosPage