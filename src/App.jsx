import { useEffect, useState } from "react";
import { ref, onValue, get, update, remove } from "firebase/database";
import { db } from "./firebase.js";
import "./App.css";
import Loader from "./components/Loader/Loader.jsx";
import { Note } from "./components/Note/Note.jsx";
import { Menu } from "./components/Menu/Menu.jsx";
import { NoteAdd } from "./components/NoteAdd/NoteAdd.jsx";

export const App = () => {
  const [todos, setTodos] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

  const todosDBRef = ref(db, "todos");

  useEffect(() => {
    setIsLoading(true);

    return onValue(todosDBRef, (snapshot) => {
      const loadedNotes = snapshot.val() || {};
      setTodos(loadedNotes);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (searchPhrase === "") {
      get(todosDBRef).then((snapshot) => {
        setTodos(snapshot.val());
      });
    } else {
      let searchResult = Object.values(todos).filter((todo) =>
        todo.todo.includes(searchPhrase, 0),
      );
      setTodos(searchResult);
    }
  }, [searchPhrase]);

  const completNote = (id, isCompleted) => {
    const noteRef = ref(db, `todos/${id}`);

    update(noteRef, {
      completed: !isCompleted,
    }).then(() => {
      let newTodos = { ...todos };
      newTodos.id.completed = !isCompleted;
      setTodos(newTodos);
    });
  };

  const editNote = (id, newValue) => {
    const noteRef = ref(db, `todos/${id}`);

    update(noteRef, {
      todo: newValue,
    }).then(() => {
      let newTodos = { ...todos };
      newTodos.id.todo = newValue;
      setTodos(newTodos);
    });
  };

  const removeNote = (id) => {
    const noteRef = ref(db, `todos/${id}`);
    remove(noteRef);
  };

  return (
    <>
      <article className="card">
        <h1>Todo List</h1>
        <Menu
          isSorted={isSorted}
          setIsSorted={setIsSorted}
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
              ? Object.entries(todos)
                  .sort((a, b) => {
                    let textA = a[1].todo.toUpperCase();
                    let textB = b[1].todo.toUpperCase();
                    return textA.localeCompare(textB);
                  })
                  .map(([id, { todo, completed }], index) => (
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
              : Object.entries(todos).map(
                  ([id, { todo, completed }], index) => (
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
                  ),
                )}
          </ol>
        )}
        <NoteAdd setIsLoading={setIsLoading} />
      </article>
    </>
  );
};
