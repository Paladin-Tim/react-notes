import { useEffect, useState } from "react";
import "./App.css";
import Loader from "./components/Loader/Loader.jsx";
import { Note } from "./components/Note/Note.jsx";
import { Menu } from "./components/Menu/Menu.jsx";
import { NoteAdd } from "./components/NoteAdd/NoteAdd.jsx";

export const App = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshNotesFlag, setRefreshNotesFlag] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

  const refreshNotes = () => {
    setRefreshNotesFlag(!refreshNotesFlag);
  };

  useEffect(() => {
    setIsLoading(true);

    fetch("http://localhost:3002/todos")
      .then((loadedData) => loadedData.json())
      .then((loadedTodos) => {
        setTodos(loadedTodos);
      })
      .finally(() => setIsLoading(false));
  }, [refreshNotesFlag]);

  useEffect(() => {
    if (searchPhrase === "") {
      refreshNotes();
    } else {
      fetch("http://localhost:3002/todos")
        .then((loadedData) => loadedData.json())
        .then((loadedTodos) => {
          let searchResult = loadedTodos.filter((todo) =>
            todo.todo.includes(searchPhrase, 0),
          );
          setTodos(searchResult);
        });
    }
  }, [searchPhrase]);

  const completNote = (id, isCompleted, index) => {
    fetch(`http://localhost:3002/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        completed: !isCompleted,
      }),
    }).then(() => {
      let newTodos = [...todos];
      newTodos[index].completed = !isCompleted;
      setTodos(newTodos);
    });
  };

  const editNote = (id, index, newValue) => {
    fetch(`http://localhost:3002/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        todo: newValue,
      }),
    }).then(() => {
      let newTodos = [...todos];
      newTodos[index].todo = newValue;
      setTodos(newTodos);
    });
  };

  const removeNote = (id) => {
    fetch(`http://localhost:3002/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
      refreshNotes();
    });
  };

  return (
    <>
      <article className="card">
        <h1>Todo List</h1>
        <Menu
          isSorted={isSorted}
          setIsSorted={setIsSorted}
          refreshNotes={refreshNotes}
          onSearch={setSearchPhrase}
        />
        {isLoading ? (
          <Loader></Loader>
        ) : todos.length === 0 ? (
          <section className="emptyWrapper">
            <div className="emptyImg"></div>
            <span>Nothing is here...</span>
          </section>
        ) : (
          <ol className="todoList">
            {isSorted
              ? todos
                  .sort((a, b) => {
                    let textA = a.todo.toUpperCase();
                    let textB = b.todo.toUpperCase();
                    return textA.localeCompare(textB);
                  })
                  .map(({ id, todo, completed }, index) => (
                    <Note
                      key={id}
                      id={id}
                      todo={todo}
                      completed={completed}
                      index={index}
                      completNote={completNote}
                      editNote={editNote}
                      removeNote={removeNote}
                    />
                  ))
              : todos.map(({ id, todo, completed }, index) => (
                  <Note
                    key={id}
                    id={id}
                    todo={todo}
                    completed={completed}
                    index={index}
                    completNote={completNote}
                    editNote={editNote}
                    removeNote={removeNote}
                  />
                ))}
          </ol>
        )}
        <NoteAdd setIsLoading={setIsLoading} refreshNotes={refreshNotes} />
      </article>
    </>
  );
};
