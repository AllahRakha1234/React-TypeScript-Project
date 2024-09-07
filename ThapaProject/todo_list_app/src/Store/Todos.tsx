import { createContext, useContext, useState, ReactNode } from "react";

// CREATING CUSTOM TYPE
export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type ChildrenType = {
    children: ReactNode; // ReactNode ==> Children can be anything like JSX element, string, or number
}

export type TodosContextType = { // To tell which type of data Store will have
    todos: Todo[];
    handleAddTodo: (task: string) => void;
    hanldeCheckBoxButton: (id: string) => void;
    hanldeDeleteTodoBtn: (todo: Todo) => void;
}

// CREATING STORE
export const TodosContext = createContext<TodosContextType | null>(null); // Use createContext, not useContext

// TODO PROVIDER TO PROVIDE DATA
export const TodosProvider = ({ children }: ChildrenType) => {

    const [todos, setTodos] = useState<Todo[]>(()=>{
        try {
            const todos = localStorage.getItem("todos") || "[]";
            return JSON.parse(todos);
        } catch (error) {
            return [];
        }
    });

    // FUNCTION TO HANDLE ADD TODO
    const handleAddTodo = (task: string) => {
        if(task.trim() === "") {
            alert("Please enter a valid task");
        }
        else{
            setTodos((prev) => {
                const newTodos: Todo[] = [
                    {
                        id: Math.random().toString(),
                        task: task,
                        completed: false,
                        createdAt: new Date(),
                    },
                    ...prev,
                ];
                localStorage.setItem("todos", JSON.stringify(newTodos));
                return newTodos;
            });
        }
    };

    // FUNCTION TO HANDLE CHECK BOX CLICK
    const hanldeCheckBoxTodoBtn = (id:string)=>{
        const updatedTodos = todos.map((todo)=>{
            if(todo.id === id){
                return {...todo, completed: !todo.completed}
            }
            return todo
        })
        setTodos(updatedTodos);
    }

    // FUNCTION TO HANDLE CHECK BOX CLICK
    const hanldeDeleteTodoBtn = (todo:Todo)=>{
        // const todoIndex = todos.indexOf(todo);
        // todos.splice(todoIndex, 1);
        // setTodos([...todos]);
        // OR
        const updatedTodos = todos.filter((t)=> t.id !== todo.id);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        setTodos(updatedTodos);
    }

    // RETURNING PROVIDER
    return (
        <TodosContext.Provider value={{ todos, handleAddTodo, hanldeCheckBoxTodoBtn, hanldeDeleteTodoBtn }}>
            {children}
        </TodosContext.Provider>
    );
};

// CONSUMER TO TAKE DATA
export const useTodos = () => {
    const todosConsumer = useContext(TodosContext); // Use TodosContext, not todosContext
    if (!todosConsumer) {
        throw new Error("Wrap the main app with TodosProvider");
    }
    return todosConsumer;
};
