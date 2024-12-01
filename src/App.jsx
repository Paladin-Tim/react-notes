import { useEffect, useState } from "react";
import "./App.css";
import Loader from "./components/Loader";

export const App = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch("https://dummyjson.com/todos")
      .then((loadedData) => loadedData.json())

      .then((loadedTodos) => {
        setTodos(loadedTodos.todos);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <article className="card">
        <h1>Todo List</h1>
        {isLoading ? (
          <Loader></Loader>
        ) : (
          <ol className="todoList">
            {todos.map((todo) => (
              <li key={todo.id} className="todoItemWrapper">
                <div className="todoItem">
                  <input type="checkbox" checked={todo.completed}></input>
                  <span>{todo.todo}</span>
                </div>
              </li>
            ))}
          </ol>
        )}
      </article>
    </>
  );
};
