import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import InputField from "../components/InputField";
import { Todo } from "../lib/taskModel";
import TodoList from "../components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import ClientOnly from "../components/ClientOnly";


const getToDos = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('todos') || "[]")
}
}

const getCompletedToDos = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('completed-todos') || "[]")
}
}

const getBacklogToDos = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('backlog-todos') || "[]")
}
}

const Home: NextPage = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>(getToDos());
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>(getCompletedToDos());
  const [BacklogTodos, setBacklogTodos] = useState<Array<Todo>>(getBacklogToDos());





  const handleNewTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo && todos) {
      const d = new Date().toLocaleString();
      setTodos([
        ...todos,
        { id: Date.now(), todo, date: d, isCompleted: false, description: "" },
      ]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;



    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = CompletedTodos;
    let backlog = BacklogTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "TodosRemove") {
      add = complete[source.index];
      complete.splice(source.index, 1);
    } else {
      add = backlog[source.index];
      backlog.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === "TodosRemove") {
      complete.splice(destination.index, 0, add);
    } else {
      backlog.splice(destination.index, 0, add);
    }

    // saving updates to localStorage
    localStorage.setItem("todos", JSON.stringify(active));
    localStorage.setItem("completed-todos", JSON.stringify(complete));
    localStorage.setItem("backlog-todos", JSON.stringify(backlog));
  };

    // saves the first completed / backlog & all new todos to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("completed-todos", JSON.stringify(CompletedTodos));
    localStorage.setItem("backlog-todos", JSON.stringify(BacklogTodos));
  }, [todos, CompletedTodos, BacklogTodos]);

  return (

      <div className={styles.container}>
        <Head>
          <title>Next Todo Tabs</title>
          <meta name="description" content="NextJS todo tabs" />
          <meta name="author" content="Elliot Heath" />
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⏱</text></svg>"
          />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT"
            crossOrigin="anonymous"
          ></link>
        </Head>
        <ClientOnly>
        <DragDropContext onDragEnd={onDragEnd}>
          <main className="container d-flex flex-column align-items-center">
            <div className={styles.special__title}>
              <h1 className="display-3 my-4">
                Next<sub className={styles.special__title__sup}>JS</sub>⠀Todo
                Tabs
              </h1>
            </div>
            <InputField
              todo={todo}
              setTodo={setTodo}
              handleNewTask={handleNewTask}
            />
            <TodoList
              todos={todos}
              setTodos={setTodos}
              CompletedTodos={CompletedTodos}
              setCompletedTodos={setCompletedTodos}
              BacklogTodos={BacklogTodos}
              setBacklogTodos={setBacklogTodos}
            />
          </main>
        </DragDropContext>
        </ClientOnly>
        <footer className="footer mt-5">
          <a
            className={styles.github__link}
            href="https://github.com/eheath30"
            target="_blank"
            rel="noopener noreferrer"
          >
            Designed by Elliot Heath
          </a>
        </footer>
        <div id="portal"></div>
      </div>

  );
};

export default Home;
